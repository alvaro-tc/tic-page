import { useEffect, useRef, useState } from 'react'
import { POSITIONS, PUESTOS, VIDEOS, img } from './data.js'

/* ---------- shared bits ---------- */

function Hero({ eyebrow, title, sub, tint = 'yellow', children }) {
  return (
    <section className={`hero tint-${tint}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {sub && <p className="lead">{sub}</p>}
      {children}
    </section>
  )
}

const Head = ({ kicker, title, sub }) => (
  <div className="head">
    {kicker && <span className="eyebrow">{kicker}</span>}
    <h2>{title}</h2>
    {sub && <p className="muted">{sub}</p>}
  </div>
)

const Avatar = ({ p, size = 48 }) => p.photo
  ? <img className="avatar" src={img(p.photo, 200)} alt={p.person} width={size} height={size} />
  : <span className={`avatar initials bg-${p.color}`} style={{ width: size, height: size }}>{p.person.split(' ').map(w => w[0]).join('')}</span>

const Video = ({ id, title }) => (
  <div className="video">
    <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} loading="lazy" allowFullScreen
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" />
  </div>
)

const Bar = ({ value, color }) => (
  <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
    <span className={`bg-${color}-strong`} style={{ width: `${value}%` }} />
  </div>
)

/* ---------- 1. Inicio ---------- */

const SERVICES = [
  ['LAN / WAN', 'Redes cableadas corporativas de alto rendimiento.', 'blue', '⇄'],
  ['Wi-Fi 7', 'Cobertura inalámbrica densa para oficinas y campus.', 'green', '◉'],
  ['SD-WAN', 'Sucursales conectadas y administradas desde la nube.', 'lilac', '☁'],
  ['Ciberseguridad', 'Firewalls de nueva generación y Zero Trust.', 'pink', '⛨'],
  ['Data Center', 'Diseño, cableado estructurado y virtualización.', 'yellow', '▦'],
  ['NOC 24/7', 'Monitoreo proactivo y soporte permanente.', 'peach', '◷'],
]

export function Home() {
  return (
    <>
      <Hero title={<>Redes inteligentes que<br />conectan tu empresa</>}
        sub="Diseñamos, implementamos y operamos infraestructura de red segura, rápida y lista para crecer.">
        <div className="actions">
          <a href="#tecnologias" className="btn dark lg">Ver tecnologías</a>
          <a href="#mision" className="btn outline lg">Quiénes somos</a>
        </div>
        <div className="stage">
          <div className="arc" />
          <figure className="phone"><img src={img('1558494949-ef010cbdcc31', 700)} alt="Rack de servidores y switches" /><span className="live">● En línea</span></figure>
          <div className="float f1 bg-blue"><img src={img('1544197150-b99a580bb7a8', 400)} alt="Cables de red" /><span className="chip">24/7</span></div>
          <div className="float f2 bg-pink stars">★★★★★</div>
          <div className="float f3 bg-yellow stat">
            <div className="bars"><i style={{ height: 30 }} /><i style={{ height: 52 }} /><i style={{ height: 22 }} /><i style={{ height: 40 }} /></div>
            <div><small>Disponibilidad</small><strong>99.9%</strong></div>
          </div>
          <div className="float f4 bg-green stat">
            <div><strong>120+</strong><small>sitios conectados este año</small><span className="chip">Fibra · SD-WAN</span></div>
          </div>
        </div>
      </Hero>

      <section className="wrap">
        <Head kicker="Área de trabajo" title="Especialistas en redes" sub="Todo el ciclo de vida de tu infraestructura, en un solo equipo." />
        <div className="grid g3">
          {SERVICES.map(([t, d, c, i]) => (
            <article key={t} className={`card bg-${c}`}><span className="icon">{i}</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>

      <section className="wrap split">
        <div>
          <Head kicker="Cómo trabajamos" title="De la auditoría a la operación" />
          <ol className="steps">
            {['Diagnóstico de la red actual', 'Diseño de arquitectura a medida', 'Implementación ágil por sprints', 'Monitoreo y mejora continua'].map(s => <li key={s}>{s}</li>)}
          </ol>
        </div>
        <Video id={VIDEOS[0].id} title={VIDEOS[0].title} />
      </section>
      <AcademicCredits />
    </>
  )
}

const STUDENTS = [
  'Alvaro Ariel Torrez Calle',
  'Rodny Gerald Siles Barrenechea',
  'Luis Angel Paredes Torrez',
  'Oziel Rodman Ramos Torrez',
]

function AcademicCredits() {
  return (
    <section className="wrap">
      <Head kicker="Proyecto académico" title="Créditos" />
      <div className="grid g2">
        <article className="card white">
          <h3>Estudiantes</h3>
          <ul className="clean">{STUDENTS.map(s => <li key={s}>{s}</li>)}</ul>
        </article>
        <article className="card white">
          <ul className="clean">
            <li><b>Docente:</b> Yamil Cárdenas Miguel PhD</li>
            <li><b>Asignatura:</b> Gerencia de las TIC</li>
            <li><b>Año:</b> 2026</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

/* ---------- 2. Gestión de tecnologías ---------- */

const TECH = {
  Conectividad: [['Wi-Fi 7', 'Multi-link operation y canales de 320 MHz.', 'Adopción'], ['SD-WAN', 'Enrutamiento por aplicación entre sucursales.', 'Estándar'], ['Fibra óptica GPON', 'Última milla de alta capacidad.', 'Estándar'], ['5G privado', 'Redes móviles dedicadas para industria.', 'Piloto']],
  Seguridad: [['NGFW', 'Firewalls con inspección profunda y IPS.', 'Estándar'], ['Zero Trust / ZTNA', 'Acceso verificado por usuario y dispositivo.', 'Adopción'], ['SASE', 'Seguridad y red convergentes en la nube.', 'Piloto'], ['NAC 802.1X', 'Control de acceso a la red por identidad.', 'Estándar']],
  'Cloud y virtualización': [['VPC multi-nube', 'Interconexión AWS, Azure y GCP.', 'Adopción'], ['SDN', 'Red definida por software en data center.', 'Adopción'], ['Kubernetes networking', 'CNI y service mesh para contenedores.', 'Piloto']],
  'Monitoreo y automatización': [['Zabbix / Grafana', 'Métricas y paneles en tiempo real.', 'Estándar'], ['Ansible', 'Configuración de equipos como código.', 'Adopción'], ['AIOps', 'Detección de anomalías con IA.', 'Piloto'], ['NetFlow / sFlow', 'Análisis de tráfico y capacidad.', 'Estándar']],
}
const STAGE_COLOR = { Estándar: 'green', Adopción: 'blue', Piloto: 'yellow' }

export function Tech() {
  const cats = Object.keys(TECH)
  const [cat, setCat] = useState(cats[0])
  return (
    <>
      <Hero tint="blue" eyebrow="Gestión de tecnologías" title="Las herramientas detrás de cada conexión"
        sub="Seleccionamos, evaluamos y gestionamos el ciclo de vida de cada tecnología que implementamos." />
      <section className="wrap">
        <div className="pills" role="tablist">
          {cats.map(c => <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="legend">{Object.entries(STAGE_COLOR).map(([s, c]) => <span key={s}><i className={`dot bg-${c}-strong`} />{s}</span>)}</div>
        <div className="grid g4">
          {TECH[cat].map(([n, d, s]) => (
            <article key={n} className="card white">
              <span className={`tag bg-${STAGE_COLOR[s]}`}>{s}</span>
              <h3>{n}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap split">
        <img className="photo" src={img('1518770660439-4636190af475')} alt="Circuito electrónico" />
        <div>
          <Head kicker="Ciclo de vida" title="Cómo gestionamos la tecnología" />
          <div className="grid g2">
            {[['1. Vigilar', 'Radar de tendencias y fabricantes.', 'lilac'], ['2. Probar', 'Laboratorio y pilotos controlados.', 'yellow'], ['3. Adoptar', 'Estándares, capacitación y soporte.', 'blue'], ['4. Retirar', 'Obsolescencia planificada.', 'pink']].map(([t, d, c]) => (
              <div key={t} className={`card sm bg-${c}`}><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------- 3. Ciencia, tecnología e innovación ---------- */

const ARTICLES = [
  ['1451187580459-43490279c0fa', 'Internet satelital de órbita baja', 'Constelaciones LEO reducen la latencia y llevan conectividad a zonas rurales.', 'blue'],
  ['1526374965328-7f61d4dc18c5', 'IA para operar redes (AIOps)', 'Modelos que predicen fallas antes de que afecten a los usuarios.', 'lilac'],
  ['1550751827-4bd374c3f58b', 'Criptografía post-cuántica', 'Nuevos algoritmos para proteger VPN y TLS frente a computadoras cuánticas.', 'pink'],
]
const GALLERY = [['1544197150-b99a580bb7a8', 'Cableado estructurado'], ['1535223289827-42f1e9919769', 'Realidad virtual sobre redes de baja latencia'], ['1485827404703-89b55fcc595e', 'Robótica conectada'], ['1581092160562-40aa08e78837', 'Ingeniería en campo']]

export function Science() {
  const [video, setVideo] = useState(VIDEOS[1])
  return (
    <>
      <Hero tint="lilac" eyebrow="Ciencia, tecnología e innovación" title="Lo que está transformando las redes"
        sub="Artículos, videos e imágenes seleccionados por nuestro equipo." />
      <section className="wrap">
        <Head kicker="Artículos" title="Lecturas destacadas" />
        <div className="grid g3">
          {ARTICLES.map(([p, t, d, c]) => (
            <article key={t} className="article">
              <img src={img(p, 600)} alt="" />
              <div className={`article-body bg-${c}`}><h3>{t}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Videos" title="Aprende en minutos" />
        <div className="player">
          <Video id={video.id} title={video.title} />
          <ul className="playlist">
            {VIDEOS.map(v => (
              <li key={v.id}><button className={v.id === video.id ? 'active' : ''} onClick={() => setVideo(v)}>
                <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" /><span><small>{v.tag}</small>{v.title}</span>
              </button></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Galería" title="Innovación en imágenes" />
        <div className="gallery">
          {GALLERY.map(([p, t]) => <figure key={p}><img src={img(p, 700)} alt={t} /><figcaption>{t}</figcaption></figure>)}
        </div>
      </section>
    </>
  )
}

/* ---------- 4. Misión y visión ---------- */

export function Mission() {
  const block = (who, mission, vision, c1, c2) => (
    <section className="wrap">
      <Head kicker={who} title={who === 'IATECH' ? 'La empresa' : 'Área de redes'} />
      <div className="grid g2">
        <article className={`card big bg-${c1}`}><span className="eyebrow">Misión</span><p className="quote">{mission}</p></article>
        <article className={`card big bg-${c2}`}><span className="eyebrow">Visión</span><p className="quote">{vision}</p></article>
      </div>
    </section>
  )
  return (
    <>
      <Hero tint="green" eyebrow="Misión y visión" title="Conectamos personas, datos y oportunidades" />
      {block('IATECH',
        'Nuestra misión es transformar la prestación de servicios médicos mediante el desarrollo de soluciones de software innovadoras que prioricen los resultados (outcomes) sobre los simples entregables. Nos comprometemos a actuar como administradores (stewards) diligentes y éticos, garantizando la integridad de los datos de salud y el cumplimiento riguroso de las normativas de seguridad, para entregar un valor tangible que mejore la calidad de vida de los pacientes y la eficiencia de los profesionales médicos.',
        'Consolidarnos como un sistema de entrega de valor líder en el sector salud global, capaz de navegar la complejidad y la incertidumbre tecnológica con adaptabilidad y resiliencia. Aspiramos a definir el futuro de la tecnología médica, integrando enfoques de desarrollo híbridos que aseguren la calidad total y permitan a las instituciones de salud alcanzar su estado futuro deseado a través de la mejora continua y el aprendizaje organizacional.',
        'yellow', 'blue')}
      {block('Redes',
        'Asegurar una infraestructura de conectividad clínica altamente segura, robusta y permanente que actúe como un administrador responsable (steward) en la protección y transmisión de los datos médicos de nuestros interesados. Nos comprometemos a diseñar y operar redes de telecomunicaciones bajo los más estrictos estándares de calidad, confiabilidad y resiliencia ante fallas, garantizando que cada componente de conectividad interactúe de forma armónica para maximizar la disponibilidad y la entrega de valor real en el cuidado de los pacientes.',
        'Ser reconocidos como el estándar en conectividad y telecomunicaciones para el sector de salud digital, liderando la adopción de redes inteligentes capaces de navegar la complejidad de entornos hospitalarios distribuidos y cambiantes. Aspiramos a consolidar una arquitectura de red proactiva que optimice constantemente la respuesta ante riesgos y amenazas de seguridad, adoptando un enfoque de pensamiento sistémico y una cultura de adaptabilidad tecnológica para facilitar las innovaciones clínicas del futuro de forma ininterrumpida.',
        'green', 'pink')}
      <section className="wrap">
        <Head kicker="Valores" title="Lo que nos guía" />
        <div className="values">
          {[['Integridad', 'yellow'], ['Innovación', 'lilac'], ['Seguridad', 'pink'], ['Trabajo en equipo', 'green'], ['Orientación al cliente', 'blue'], ['Mejora continua', 'peach']].map(([v, c]) => <span key={v} className={`bg-${c}`}>{v}</span>)}
        </div>
      </section>
    </>
  )
}

/* ---------- 5. Organigrama ---------- */

const DOCS = `${import.meta.env.BASE_URL}puestos/`

export function OrgChart() {
  const [open, setOpen] = useState(null)
  const dialog = useRef(null)
  const p = PUESTOS.find(x => x.clave === open)
  const [lead, ...team] = PUESTOS

  // precarga los documentos ya renderizados para que abrirlos sea instantáneo
  useEffect(() => { PUESTOS.forEach(x => { new Image().src = `${DOCS}${x.clave}.svg` }) }, [])
  useEffect(() => {
    const d = dialog.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const node = x => (
    <button className={`node wide bg-${x.color}`} onClick={() => setOpen(x.clave)} aria-haspopup="dialog">
      <span className="icon sm" aria-hidden="true">{x.icon}</span><span><b>{x.denominacion}</b><small>{x.codigo}</small></span>
    </button>
  )

  return (
    <>
      <Hero tint="peach" eyebrow="Organigrama" title="Departamento de Redes" sub="Estructura del área según el manual de funciones. Haz clic en un puesto para ver su descripción oficial." />
      <section className="wrap">
        <div className="grid g4 kpis">
          {[['Puestos documentados', PUESTOS.length, 'yellow'], ['Niveles jerárquicos', 3, 'green'], ['Personas a cargo del coordinador', team.length, 'blue'], ['Edición del manual', 'Ago 2026', 'pink']].map(([l, v, c]) => (
            <div key={l} className={`card sm bg-${c}`}><strong className="num">{v}</strong><small>{l}</small></div>
          ))}
        </div>
        <div className="tree-scroll">
          <ul className="tree org">
            <li>
              <span className="node wide ghost"><span><b>Dirección de Tecnología y Producto</b><small>Nivel directivo</small></span></span>
              <ul><li>{node(lead)}<ul>{team.map(x => <li key={x.clave}>{node(x)}</li>)}</ul></li></ul>
            </li>
          </ul>
        </div>
        <p className="muted hint">¿Todo junto? <a href={`${DOCS}manual-de-funciones.pdf`} target="_blank" rel="noopener">Descargar el manual de funciones (PDF)</a></p>
      </section>
      <dialog ref={dialog} className="doc" aria-label={p?.denominacion} onClose={() => setOpen(null)}
        onClick={e => e.target === e.currentTarget && setOpen(null)}>
        {p && <>
          <header>
            <span><b>{p.denominacion}</b><small>{p.codigo} · {p.categoria}</small></span>
            <a className="btn outline" href={`${DOCS}${p.clave}.pdf`} target="_blank" rel="noopener">PDF</a>
            <button className="btn dark" onClick={() => setOpen(null)} aria-label="Cerrar">✕</button>
          </header>
          <div className="doc-body"><img src={`${DOCS}${p.clave}.svg`} alt={`Descripción de puesto: ${p.denominacion}`} /></div>
        </>}
      </dialog>
    </>
  )
}

/* ---------- 6. Descripción de posiciones ---------- */

export function Positions() {
  const [open, setOpen] = useState('ceo')
  return (
    <>
      <Hero tint="pink" eyebrow="Descripción de posiciones" title="Cada rol, con propósito" sub="Responsabilidades, requisitos y línea de reporte de cada puesto del organigrama." />
      <section className="wrap narrow">
        {POSITIONS.map(p => {
          const boss = POSITIONS.find(x => x.id === p.reportsTo)
          const isOpen = open === p.id
          return (
            <article key={p.id} className={`acc ${isOpen ? 'open' : ''}`}>
              <button className="acc-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : p.id)}>
                <Avatar p={p} size={44} />
                <span><b>{p.title}</b><small>{p.area} · {p.person}</small></span>
                <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
              </button>
              {isOpen && (
                <div className="acc-body">
                  <p>{p.summary}</p>
                  <div className="grid g3">
                    <div className={`card sm bg-${p.color}`}><h4>Responsabilidades</h4><ul>{p.duties.map(d => <li key={d}>{d}</li>)}</ul></div>
                    <div className="card sm bg-soft"><h4>Requisitos</h4><ul>{p.reqs.map(d => <li key={d}>{d}</li>)}</ul></div>
                    <div className="card sm bg-soft"><h4>Relaciones</h4><ul>
                      <li>Reporta a: {boss ? boss.title : 'Directorio'}</li>
                      {POSITIONS.filter(k => k.reportsTo === p.id).map(k => <li key={k.id}>Supervisa: {k.title}</li>)}
                    </ul></div>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </section>
    </>
  )
}

/* ---------- 7. MBTI ---------- */

const DICHOTOMIES = [
  ['E', 'Extroversión', 'I', 'Introversión', '¿De dónde obtienes energía?', 'yellow'],
  ['S', 'Sensación', 'N', 'Intuición', '¿Cómo percibes la información?', 'green'],
  ['T', 'Pensamiento', 'F', 'Sentimiento', '¿Cómo tomas decisiones?', 'blue'],
  ['J', 'Juicio', 'P', 'Percepción', '¿Cómo te organizas?', 'pink'],
]
const GROUPS = [
  ['Analistas', 'lilac', ['INTJ', 'INTP', 'ENTJ', 'ENTP'], 'Estrategia y resolución de problemas complejos.'],
  ['Diplomáticos', 'green', ['INFJ', 'INFP', 'ENFJ', 'ENFP'], 'Comunicación, empatía y motivación de equipos.'],
  ['Centinelas', 'blue', ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], 'Orden, procesos y confiabilidad operativa.'],
  ['Exploradores', 'yellow', ['ISTP', 'ISFP', 'ESTP', 'ESFP'], 'Acción, adaptación y respuesta rápida.'],
]

export function Mbti() {
  const groupOf = t => GROUPS.find(g => g[2].includes(t))
  return (
    <>
      <Hero tint="lilac" eyebrow="MBTI" title="Conocernos para trabajar mejor"
        sub="El Myers-Briggs Type Indicator describe preferencias de personalidad en 4 dimensiones que combinan 16 tipos." />
      <section className="wrap">
        <Head kicker="¿Qué es?" title="Las 4 dimensiones" sub="Nadie es 100% de un polo: son preferencias, no capacidades." />
        <div className="grid g4">
          {DICHOTOMIES.map(([a, an, b, bn, q, c]) => (
            <article key={a} className={`card bg-${c}`}>
              <p className="muted">{q}</p>
              <div className="pair"><span><b>{a}</b>{an}</span><em>vs</em><span><b>{b}</b>{bn}</span></div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <Head kicker="16 tipos" title="Cuatro temperamentos" />
        <div className="grid g4">
          {GROUPS.map(([n, c, types, d]) => (
            <article key={n} className={`card bg-${c}`}>
              <h3>{n}</h3><p>{d}</p>
              <div className="types">{types.map(t => <span key={t}>{t}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Aplicación en IATECH" title="Perfiles del equipo" sub="Usamos MBTI para mejorar la comunicación y armar equipos equilibrados, nunca para seleccionar ni descartar personas." />
        <div className="grid g3">
          {POSITIONS.map(p => {
            const g = groupOf(p.mbti)
            return (
              <div key={p.id} className="card white row">
                <Avatar p={p} size={44} />
                <span className="grow"><b>{p.person}</b><small className="muted">{p.title}</small></span>
                <span className={`tag bg-${g[1]}`}>{p.mbti}</span>
              </div>
            )
          })}
        </div>
        <div className="grid g3 tips">
          {[['Comunicación', 'Introvertidos: agenda y contexto por escrito antes de las reuniones.', 'blue'], ['Decisiones', 'Combina perfiles T (datos) y F (impacto en personas) en los comités.', 'pink'], ['Proyectos', 'Perfiles J planifican el sprint; perfiles P aportan flexibilidad ante incidentes.', 'yellow']].map(([t, d, c]) => (
            <div key={t} className={`card sm bg-${c}`}><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- 8. Scrum + Kanban ---------- */

const COLUMNS = [['backlog', 'Backlog', 'lilac'], ['todo', 'Por hacer', 'blue'], ['doing', 'En progreso', 'yellow'], ['review', 'Revisión', 'pink'], ['done', 'Hecho', 'green']]
const INITIAL_TASKS = [
  { id: 1, title: 'Levantamiento de red sucursal Norte', col: 'backlog', who: 'SV' },
  { id: 2, title: 'Configurar VLANs de invitados', col: 'todo', who: 'PR' },
  { id: 3, title: 'Política ZTNA para VPN', col: 'doing', who: 'JS' },
  { id: 4, title: 'Dashboard Grafana de enlaces WAN', col: 'review', who: 'MC' },
  { id: 5, title: 'Actualizar firmware de switches core', col: 'done', who: 'PR' },
]

function Kanban() {
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('iatech-kanban')) || INITIAL_TASKS } catch { return INITIAL_TASKS }
  })
  const [text, setText] = useState('')
  const [over, setOver] = useState(null)

  useEffect(() => { try { localStorage.setItem('iatech-kanban', JSON.stringify(tasks)) } catch { /* storage blocked */ } }, [tasks])

  const move = (id, col) => setTasks(ts => ts.map(t => t.id === id ? { ...t, col } : t))
  const shift = (t, dir) => {
    const i = COLUMNS.findIndex(c => c[0] === t.col) + dir
    if (COLUMNS[i]) move(t.id, COLUMNS[i][0])
  }
  const add = e => {
    e.preventDefault()
    if (!text.trim()) return
    setTasks(ts => [...ts, { id: Date.now(), title: text.trim(), col: 'backlog', who: 'IA' }])
    setText('')
  }

  return (
    <>
      <form className="add" onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Nueva tarea para el backlog…" aria-label="Nueva tarea" />
        <button className="btn dark">Agregar</button>
        <button type="button" className="btn outline" onClick={() => setTasks(INITIAL_TASKS)}>Reiniciar</button>
      </form>
      <div className="board">
        {COLUMNS.map(([id, name, c]) => {
          const list = tasks.filter(t => t.col === id)
          return (
            <div key={id} className={`col bg-${c} ${over === id ? 'over' : ''}`}
              onDragOver={e => { e.preventDefault(); setOver(id) }} onDragLeave={() => setOver(null)}
              onDrop={e => { move(Number(e.dataTransfer.getData('text')), id); setOver(null) }}>
              <h4>{name} <span>{list.length}</span></h4>
              {list.map(t => (
                <div key={t.id} className="task" draggable onDragStart={e => e.dataTransfer.setData('text', t.id)}>
                  <p>{t.title}</p>
                  <div className="task-foot">
                    <span className="who">{t.who}</span>
                    <span>
                      <button aria-label="Mover a la izquierda" onClick={() => shift(t, -1)}>←</button>
                      <button aria-label="Mover a la derecha" onClick={() => shift(t, 1)}>→</button>
                      <button aria-label="Eliminar" onClick={() => setTasks(ts => ts.filter(x => x.id !== t.id))}>×</button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

export function Scrum() {
  return (
    <>
      <Hero tint="yellow" eyebrow="Scrum" title="Entregas cortas, mejora constante"
        sub="Marco ágil que usamos en proyectos de red: sprints de 2 semanas con valor visible en cada entrega." />
      <section className="wrap">
        <div className="grid g3">
          <article className="card bg-blue"><span className="eyebrow">Roles</span><ul className="clean"><li><b>Product Owner</b> prioriza el valor</li><li><b>Scrum Master</b> facilita y remueve impedimentos</li><li><b>Developers</b> construyen el incremento</li></ul></article>
          <article className="card bg-green"><span className="eyebrow">Eventos</span><ul className="clean"><li><b>Sprint</b> 2 semanas</li><li><b>Planning</b> qué y cómo</li><li><b>Daily</b> 15 minutos</li><li><b>Review</b> y <b>Retrospectiva</b></li></ul></article>
          <article className="card bg-pink"><span className="eyebrow">Artefactos</span><ul className="clean"><li><b>Product Backlog</b></li><li><b>Sprint Backlog</b></li><li><b>Incremento</b> con Definition of Done</li></ul></article>
        </div>
      </section>
      <section className="wrap split">
        <Video id="9TycLR0TqFA" title="Introduction to Scrum - 7 Minutes" />
        <div>
          <Head kicker="Valores Scrum" title="Compromiso, foco, apertura, respeto y coraje" sub="Scrum define el ritmo; Kanban hace visible el flujo de trabajo." />
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Tablero Kanban" title="Sprint actual" sub="Arrastra las tarjetas entre columnas o usa las flechas. Los cambios se guardan en tu navegador." />
        <Kanban />
      </section>
    </>
  )
}

/* ---------- 9. Goals ---------- */

const COMPANY_GOALS = [
  ['Disponibilidad de red', 'Mantener 99.95% en clientes con SLA', 80, 'green'],
  ['Crecimiento', '+25% de facturación anual', 62, 'yellow'],
  ['Transformación', '60% de clientes en SD-WAN', 45, 'blue'],
  ['Talento', '100% del equipo técnico certificado', 55, 'pink'],
]

export function Goals() {
  const areas = ['Todas', ...new Set(POSITIONS.map(p => p.area))]
  const [area, setArea] = useState('Todas')
  const people = POSITIONS.filter(p => area === 'Todas' || p.area === area)
  return (
    <>
      <Hero tint="green" eyebrow="Goals" title="Objetivos claros, responsables claros" sub="Metas de la empresa para este año y la asignación de objetivos personales." />
      <section className="wrap">
        <Head kicker="Empresa" title="Objetivos estratégicos" />
        <div className="grid g4">
          {COMPANY_GOALS.map(([t, d, v, c]) => (
            <article key={t} className={`card bg-${c}`}>
              <strong className="num">{v}%</strong><h3>{t}</h3><p>{d}</p><Bar value={v} color={c} />
            </article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Asignación de personal" title="Objetivos personales" />
        <div className="pills">
          {areas.map(a => <button key={a} className={a === area ? 'active' : ''} onClick={() => setArea(a)}>{a}</button>)}
        </div>
        <div className="grid g3">
          {people.map(p => (
            <article key={p.id} className="card white">
              <div className="row"><Avatar p={p} size={48} /><span className="grow"><b>{p.person}</b><small className="muted">{p.title}</small></span></div>
              {p.goals.map(([g, v]) => (
                <div key={g} className="goal"><div className="goal-line"><span>{g}</span><b>{v}%</b></div><Bar value={v} color={p.color} /></div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
