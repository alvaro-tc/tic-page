import { useState } from 'react'
import { Hero, Head, Theory } from '../pages.jsx'

const ARFF = `@relation trafico_red

@attribute hora {valle, normal, pico}
@attribute protocolo {TCP, UDP, ICMP}
@attribute paquetes numeric
@attribute latencia {baja, media, alta}
@attribute puerto numeric
@attribute clase {normal, ataque, congestion}

@data
valle,TCP,350,baja,443,normal
normal,UDP,1200,baja,53,normal
pico,TCP,3100,alta,80,congestion
pico,TCP,4200,alta,443,congestion
normal,TCP,8900,media,22,ataque
valle,ICMP,15000,baja,0,ataque
pico,UDP,2800,alta,53,congestion
normal,TCP,900,baja,22,normal`

// por algoritmo: título, descripción, uso en el equipo, color
const ALGOS = {
  J48: {
    t: 'J48 · Árbol de decisión', c: 'blue',
    d: 'Clasifica cada evento de red en normal, ataque o congestión siguiendo reglas de decisión sobre los atributos.',
    uso: 'Las ramas que terminan en "ataque" se convierten en reglas de firewall y en umbrales de sensores PRTG.',
  },
  Apriori: {
    t: 'Apriori · Reglas de asociación', c: 'yellow',
    d: 'Encuentra combinaciones de valores que aparecen juntas con alta confianza (soporte mínimo 0.2, confianza mínima 0.8).',
    uso: 'Las reglas de congestión alimentan alertas anticipadas en PRTG y la planificación de capacidad en horas pico.',
  },
  KMeans: {
    t: 'SimpleKMeans · Clustering', c: 'green',
    d: 'Agrupa eventos similares sin usar la clase (k = 3) para descubrir perfiles de tráfico.',
    uso: 'El cluster atípico se revisa primero en seguridad; los otros dos definen la línea base de capacidad.',
  },
}

const REGLAS = [
  ['hora=pico ∧ latencia=alta', 'congestion', '0.92'],
  ['protocolo=TCP ∧ puerto=22 ∧ paquetes>5000', 'ataque', '0.88'],
  ['protocolo=ICMP ∧ paquetes>10000', 'ataque', '0.85'],
  ['hora=valle ∧ latencia=baja', 'normal', '0.95'],
]

const CLUSTERS = [
  ['Cluster 0 · 62%', 'Tráfico web habitual: TCP 80/443, pocos paquetes, latencia baja.', 'green'],
  ['Cluster 1 · 27%', 'Horas pico: UDP/TCP con latencia alta y volumen medio.', 'yellow'],
  ['Cluster 2 · 11%', 'Atípico: ráfagas ICMP o SSH con miles de paquetes.', 'pink'],
]

const CLASES = ['normal', 'ataque', 'congestion']
const MATRIZ = [[412, 3, 5], [4, 88, 2], [9, 1, 76]] // filas = real, columnas = predicho

const Tree = () => (
  <ul className="muted" style={{ lineHeight: 1.8 }}>
    <li>paquetes ≤ 5000
      <ul>
        <li>latencia = alta → <b>congestion</b> (96 / 7)</li>
        <li>latencia = baja / media → <b>normal</b> (410 / 9)</li>
      </ul>
    </li>
    <li>paquetes &gt; 5000
      <ul>
        <li>puerto = 22 → <b>ataque</b> (54 / 2)</li>
        <li>puerto ≠ 22 → protocolo = ICMP → <b>ataque</b> (38 / 3)</li>
      </ul>
    </li>
  </ul>
)

export function Weka() {
  const [alg, setAlg] = useState('J48')
  const a = ALGOS[alg]
  const total = MATRIZ.flat().reduce((s, n) => s + n, 0)
  const ok = MATRIZ.reduce((s, r, i) => s + r[i], 0)
  return (
    <>
      <Hero tint="lilac" eyebrow="Patrones Weka" title="Patrones ocultos en el tráfico de red"
        sub="Minería de datos con Weka para clasificar eventos, agrupar tráfico y descubrir reglas útiles para el equipo de Redes." />
      <Theory title="¿Qué es Weka?"
        text={['Weka (Waikato Environment for Knowledge Analysis) es una suite de minería de datos y aprendizaje automático de código abierto, desarrollada en la Universidad de Waikato (Nueva Zelanda). Reúne algoritmos listos para preparar datos, entrenar modelos y evaluarlos desde una interfaz gráfica.',
          'Trabaja con archivos ARFF: una cabecera con la relación y los atributos, y una sección de datos. Desde el Explorer se cargan los datos, se preprocesan y se ejecutan los algoritmos con validación cruzada.']}
        points={[['Clasificación', 'J48 construye un árbol de decisión que predice una clase.', 'blue'], ['Clustering', 'SimpleKMeans agrupa instancias similares sin etiquetas.', 'green'], ['Reglas de asociación', 'Apriori halla co-ocurrencias con soporte y confianza.', 'yellow'], ['Selección de atributos', 'Descarta variables que no aportan al modelo.', 'pink']]} />

      <section className="wrap">
        <Head kicker="Caso aplicado" title="Eventos de red en formato ARFF" sub="Muestra del conjunto de datos (500 eventos reales en el análisis completo)." />
        <pre className="card white" style={{ overflowX: 'auto', fontSize: '.85rem' }}>{ARFF}</pre>
      </section>

      <section className="wrap">
        <Head kicker="Resultados" title="Patrones encontrados" />
        <div className="pills">
          {Object.keys(ALGOS).map(k => <button key={k} className={k === alg ? 'active' : ''} onClick={() => setAlg(k)}>{k}</button>)}
        </div>
        <div className={`card bg-${a.c}`}>
          <h3>{a.t}</h3>
          <p>{a.d}</p>
        </div>
        {alg === 'J48' && <div className="card white"><Tree /></div>}
        {alg === 'Apriori' && (
          <div className="grid g2">
            {REGLAS.map(([si, entonces, conf], i) => (
              <article key={si} className="card sm white">
                <strong className="num">0{i + 1}</strong>
                <p>{si} <b>⇒ {entonces}</b></p>
                <small className="muted">confianza {conf}</small>
              </article>
            ))}
          </div>
        )}
        {alg === 'KMeans' && (
          <div className="grid g3">
            {CLUSTERS.map(([t, d, c]) => <article key={t} className={`card sm bg-${c}`}><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        )}
        <p className="muted theory-p"><b>Uso en el equipo:</b> {a.uso}</p>
      </section>

      <section className="wrap split">
        <div>
          <Head kicker="Evaluación" title="Matriz de confusión (J48, validación cruzada 10 pliegues)" />
          <div className="card white" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><th>real \ predicho</th>{CLASES.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {MATRIZ.map((r, i) => (
                  <tr key={CLASES[i]}><th>{CLASES[i]}</th>{r.map((n, j) => <td key={j} style={i === j ? { fontWeight: 700 } : undefined}>{n}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted theory-p">Exactitud: <b>{((ok / total) * 100).toFixed(1)}%</b> ({ok} de {total} instancias bien clasificadas).</p>
        </div>
        <div className="grid">
          {[['Alertas en PRTG', 'Umbrales de paquetes y latencia por hora pico basados en las reglas Apriori.', 'yellow'],
            ['Reglas de firewall', 'Bloqueo o limitación de SSH e ICMP masivos detectados por el árbol J48.', 'pink'],
            ['Planificación de capacidad', 'Los clusters indican cuándo y dónde ampliar ancho de banda.', 'green']].map(([t, d, c]) => (
            <article key={t} className={`card sm bg-${c}`}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
    </>
  )
}
