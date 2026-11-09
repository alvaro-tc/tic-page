import { Hero, Head, Theory } from '../pages.jsx'

const bs = n => `Bs ${n.toLocaleString('es-BO', { maximumFractionDigits: 0 })}`

// [categoría, tipo, color, [[concepto, cantidad, unidad, precio unitario Bs]]]
const CATS = [
  ['Hardware', 'CAPEX', 'blue', [
    ['Switch capa 3 (core/distribución)', 4, 'u', 18500],
    ['Router de borde', 2, 'u', 12000],
    ['Firewall de nueva generación', 2, 'u', 24000],
    ['Access points Wi-Fi 6/7', 8, 'u', 2800],
  ]],
  ['Cableado estructurado', 'CAPEX', 'green', [
    ['Cable UTP Cat6 (bobina 305 m)', 6, 'u', 1100],
    ['Patch panel 24 puertos', 6, 'u', 450],
    ['Rack 42U', 2, 'u', 3800],
    ['Instalación y certificación', 1, 'glb', 9000],
  ]],
  ['Software y licencias', 'OPEX', 'lilac', [
    ['PRTG (monitoreo, licencia anual)', 1, 'año', 14000],
    ['Tableau (analítica)', 5, 'lic', 4200],
    ['Weka (código abierto)', 1, 'u', 0],
  ]],
  ['Personal', 'OPEX', 'yellow', [
    ['Coordinador', 6, 'mes', 9000],
    ['Administrador de Redes', 6, 'mes', 7000],
    ['Seguridad', 6, 'mes', 7500],
    ['Soporte y Monitoreo', 6, 'mes', 4500],
  ]],
  ['Capacitación', 'OPEX', 'pink', [
    ['Talleres y certificaciones del equipo', 1, 'glb', 8000],
  ]],
]

const CONTINGENCIA = 0.10
const sum = items => items.reduce((s, [, q, , p]) => s + q * p, 0)
const rows = CATS.map(([name, tipo, color, items]) => ({ name, tipo, color, items, sub: sum(items) }))
const base = rows.reduce((s, r) => s + r.sub, 0)
const capex = rows.filter(r => r.tipo === 'CAPEX').reduce((s, r) => s + r.sub, 0)
const opex = base - capex
const conting = base * CONTINGENCIA
const total = base + conting
const pct = n => ((n / total) * 100).toFixed(1)

const TH = { textAlign: 'left', padding: '8px 10px' }
const TD = { padding: '6px 10px' }
const R = { ...TD, textAlign: 'right' }

export function Presupuesto() {
  return (
    <>
      <Hero eyebrow="Presupuesto" tint="green"
        title={<>Cuánto cuesta<br />conectar la empresa</>}
        sub="Estimación en bolivianos del proyecto de red: inversión inicial, operación del equipo y reserva para imprevistos." />

      <Theory title="¿Qué es un presupuesto de proyecto?"
        text={[
          'Es la estimación ordenada de todos los recursos económicos que un proyecto necesita, repartida por categorías y por periodo. Sirve como línea base para decidir, aprobar y medir.',
          'No termina al aprobarse: durante la ejecución se compara lo gastado con lo planificado para corregir a tiempo.',
        ]}
        points={[
          ['CAPEX vs OPEX', 'CAPEX es la inversión en activos (equipos, cableado). OPEX es el gasto recurrente (licencias, personal, soporte).', 'blue'],
          ['Directos / indirectos', 'Directos se imputan al proyecto (switches, horas del equipo). Indirectos se prorratean (energía, administración).', 'yellow'],
          ['Contingencia', 'Reserva (5-15%) para riesgos identificados e imprevistos; se libera solo con aprobación.', 'pink'],
          ['Control y desviación', 'Desviación = ejecutado − presupuestado. Se vigila de forma periódica y se corrige si supera el umbral.', 'green'],
        ]} />

      <section className="wrap">
        <Head kicker="Ejemplo aplicado" title="Presupuesto del proyecto de red"
          sub="Línea base de seis meses. Los totales se calculan a partir de las partidas." />

        <div className="grid g4">
          <div className="card sm bg-yellow"><span className="eyebrow">Total</span><h3 className="num">{bs(total)}</h3></div>
          <div className="card sm bg-blue"><span className="eyebrow">CAPEX</span><h3 className="num">{bs(capex)}</h3></div>
          <div className="card sm bg-lilac"><span className="eyebrow">OPEX</span><h3 className="num">{bs(opex)}</h3></div>
          <div className="card sm bg-pink"><span className="eyebrow">Contingencia {CONTINGENCIA * 100}%</span><h3 className="num">{bs(conting)}</h3></div>
        </div>

        <div className="card white" style={{ marginTop: 24, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr><th style={TH}>Concepto</th><th style={R}>Cant.</th><th style={R}>P. unit.</th><th style={R}>Subtotal</th></tr>
            </thead>
            <tbody>
              {rows.map(r => [
                <tr key={r.name} className={`bg-${r.color}`}>
                  <th style={TH} colSpan={3}>{r.name} <span className="pills">{r.tipo}</span></th>
                  <th style={{ ...R, fontWeight: 700 }}>{bs(r.sub)}</th>
                </tr>,
                ...r.items.map(([c, q, u, p]) => (
                  <tr key={r.name + c}>
                    <td style={TD}>{c}</td>
                    <td style={R}>{q} {u}</td>
                    <td style={R}>{bs(p)}</td>
                    <td style={R}>{bs(q * p)}</td>
                  </tr>
                )),
              ])}
              <tr><td style={TD} colSpan={3}>Contingencia ({CONTINGENCIA * 100}% del subtotal {bs(base)})</td><td style={R}>{bs(conting)}</td></tr>
              <tr><th style={TH} colSpan={3}>TOTAL</th><th style={R}>{bs(total)}</th></tr>
            </tbody>
          </table>
        </div>

        <div className="card white" style={{ marginTop: 24 }}>
          <h3>Distribución por categoría</h3>
          {[...rows.map(r => ({ name: r.name, color: r.color, v: r.sub })), { name: 'Contingencia', color: 'peach', v: conting }].map(d => (
            <div key={d.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 190px) 1fr 70px', gap: 12, alignItems: 'center', margin: '10px 0' }}>
              <span>{d.name}</span>
              <div style={{ background: 'rgba(0,0,0,.06)', borderRadius: 99, height: 14, overflow: 'hidden' }}>
                <div className={`bg-${d.color}`} style={{ width: `${pct(d.v)}%`, height: '100%', borderRadius: 99, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.25)' }} />
              </div>
              <b style={{ textAlign: 'right' }}>{pct(d.v)}%</b>
            </div>
          ))}
        </div>

        <div className="card bg-green" style={{ marginTop: 24 }}>
          <h3>Control: presupuestado vs ejecutado</h3>
          <p>
            Cada mes se compara el gasto ejecutado con la línea base. Una desviación dentro de ±5% se considera
            saludable; fuera de ese rango se analiza la causa y se decide si usar la contingencia o replanificar.
            Es el mismo indicador que sigue el Coordinador en sus KPI.
          </p>
        </div>
      </section>
    </>
  )
}
