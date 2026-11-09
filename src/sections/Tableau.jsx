import { Hero, Head, Theory } from '../pages.jsx'

// Exportación de ejemplo de PRTG (datos ilustrativos)
const ROWS = [
  ['Sede Central', 'SW-CORE-01', 940, 8, 0.1, 1, 99.98],
  ['Sede Central', 'FW-EDGE-01', 780, 12, 0.2, 2, 99.95],
  ['Sucursal Norte', 'RT-NOR-01', 220, 45, 0.8, 3, 99.7],
  ['Sucursal Norte', 'AP-NOR-03', 90, 62, 1.2, 4, 99.4],
  ['Sucursal Sur', 'RT-SUR-01', 150, 88, 1.9, 5, 99.1],
  ['Sucursal Sur', 'SW-SUR-02', 310, 30, 0.4, 2, 99.8],
  ['Data Center', 'SW-DC-01', 980, 5, 0.0, 0, 99.99],
  ['Data Center', 'SRV-MON-01', 850, 7, 0.1, 1, 99.97],
  ['Sucursal Este', 'RT-EST-01', 60, 135, 3.4, 7, 97.9],
  ['Sucursal Este', 'AP-EST-02', 40, 118, 2.8, 6, 98.3],
]

const SEDES = ['Sede Central', 'Sucursal Norte', 'Sucursal Sur', 'Data Center', 'Sucursal Este']
const latSede = SEDES.map(s => {
  const r = ROWS.filter(x => x[0] === s)
  return [s, Math.round(r.reduce((a, x) => a + x[3], 0) / r.length)]
})
const MESES = [['Jun', 14], ['Jul', 11], ['Ago', 17], ['Sep', 9], ['Oct', 12], ['Nov', 6]]

const sum = i => ROWS.reduce((a, r) => a + r[i], 0)
const avg = i => sum(i) / ROWS.length
const nivel = l => (l > 100 ? 'Crítico' : l > 50 ? 'Alerta' : 'Normal')
const color = l => (l > 100 ? '#e06b8b' : l > 50 ? '#f2c94c' : '#6bbf8a')

// barras horizontales / verticales en SVG
const BarsH = ({ data, colorOf }) => (
  <svg viewBox="0 0 320 170" width="100%" role="img" aria-label="Latencia promedio por sede">
    {data.map(([n, v], i) => (
      <g key={n} transform={`translate(0 ${i * 33 + 4})`}>
        <text x="0" y="17" fontSize="11" fill="currentColor">{n}</text>
        <rect x="105" y="4" width={v * 1.4} height="18" rx="5" fill={colorOf(v)} />
        <text x={110 + v * 1.4} y="17" fontSize="11" fill="currentColor">{v} ms</text>
      </g>
    ))}
  </svg>
)

const BarsV = ({ data }) => (
  <svg viewBox="0 0 320 170" width="100%" role="img" aria-label="Incidentes por mes">
    {data.map(([m, v], i) => (
      <g key={m}>
        <rect x={i * 52 + 12} y={140 - v * 7} width="36" height={v * 7} rx="5" fill="#7aa7e6" />
        <text x={i * 52 + 30} y={134 - v * 7} fontSize="11" textAnchor="middle" fill="currentColor">{v}</text>
        <text x={i * 52 + 30} y="158" fontSize="11" textAnchor="middle" fill="currentColor">{m}</text>
      </g>
    ))}
  </svg>
)

const PASOS = [
  ['Conectar', 'Exportar los sensores de PRTG a CSV y abrirlo en Tableau con Connect > Text file. Verificar los tipos de dato (texto, número, fecha).'],
  ['Dimensiones y medidas', 'Sede y Dispositivo son dimensiones (azul); Ancho de banda, Latencia, % Pérdida, Incidentes y Disponibilidad son medidas (verde).'],
  ['Campo calculado', 'Crear "Nivel" con IF [Latencia] > 100 THEN "Crítico" ELSEIF [Latencia] > 50 THEN "Alerta" ELSE "Normal" END y usarlo como color.'],
  ['Hojas', 'Una hoja por visual: barras de latencia promedio por Sede, barras de incidentes por mes y una tarjeta por KPI.'],
  ['Filtro', 'Agregar el filtro Sede a las hojas y aplicarlo a todas las hojas del libro (Apply to Worksheets).'],
  ['Dashboard', 'Arrastrar las hojas a un dashboard, ubicar los KPI arriba y publicarlo en Tableau Public o Server.'],
]

export function Tableau() {
  const crit = ROWS.filter(r => r[3] > 100).length
  return (
    <>
      <Hero tint="lilac" eyebrow="Datos · Tableau" title="Del monitoreo al tablero de decisiones"
        sub="Cómo convertimos los datos exportados de PRTG en visualizaciones que el equipo puede leer de un vistazo." />

      <Theory title="¿Qué es Tableau?"
        text={['Tableau es una herramienta de visualización de datos e inteligencia de negocios (BI). Se conecta a fuentes de datos (archivos CSV, Excel, bases de datos, servicios en la nube) y permite explorarlas arrastrando campos, sin escribir código, para construir gráficos interactivos.',
          'Las hojas (worksheets) contienen cada gráfico y se combinan en un dashboard. Los filtros y los campos calculados permiten segmentar y derivar nueva información a partir de los datos originales.']}
        points={[
          ['Fuente de datos', 'Conexión a CSV, Excel o bases de datos; puede ser en vivo o un extracto.', 'yellow'],
          ['Dimensiones y medidas', 'Dimensión: categoría para agrupar (sede). Medida: valor numérico a agregar (latencia).', 'blue'],
          ['Hojas y dashboards', 'Una hoja es un gráfico; el dashboard reúne varias hojas en una sola vista.', 'pink'],
          ['Filtros y campos calculados', 'Filtran la vista o crean medidas nuevas con fórmulas como IF/THEN.', 'green'],
        ]} />

      <section className="wrap">
        <Head kicker="Ejemplo aplicado" title="Datos de monitoreo de red"
          sub="Muestra ilustrativa tipo exportación de PRTG: una fila por dispositivo." />
        <div className="manual card white" style={{ overflowX: 'auto' }}>
          <table>
            <thead><tr>{['Sede', 'Dispositivo', 'Ancho de banda (Mbps)', 'Latencia (ms)', 'Pérdida (%)', 'Incidentes', 'Disponibilidad (%)', 'Nivel'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r[1]}>{r.map((c, i) => <td key={i}>{c}</td>)}<td>{nivel(r[3])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap">
        <Head kicker="Dashboard" title="Vista de ejemplo" sub="Maqueta del tablero que se construye en Tableau con estos datos." />
        <div className="grid g4 kpis">
          <div className="card sm bg-blue"><span className="num">{avg(3).toFixed(0)} ms</span><p>Latencia promedio</p></div>
          <div className="card sm bg-pink"><span className="num">{sum(5)}</span><p>Incidentes totales</p></div>
          <div className="card sm bg-green"><span className="num">{avg(6).toFixed(2)}%</span><p>Disponibilidad media</p></div>
          <div className="card sm bg-yellow"><span className="num">{crit}</span><p>Dispositivos críticos</p></div>
        </div>
        <div className="grid g2">
          <div className="card white">
            <h3>Latencia promedio por sede</h3>
            <BarsH data={latSede} colorOf={color} />
            <div className="pills"><span>Normal ≤ 50</span><span>Alerta 51-100</span><span>Crítico &gt; 100</span></div>
          </div>
          <div className="card white">
            <h3>Incidentes por mes</h3>
            <BarsV data={MESES} />
          </div>
        </div>
      </section>

      <section className="wrap">
        <Head kicker="Paso a paso" title="Cómo lo construye el equipo en Tableau" />
        <ol className="steps">
          {PASOS.map(([t, d]) => <li key={t}><span><b>{t}.</b> {d}</span></li>)}
        </ol>
      </section>
    </>
  )
}
