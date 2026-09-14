import { useEffect, useRef, useState } from 'react'
import { PUESTOS, VIDEOS, img } from './data.js'
import DIAGRAM_URL from '../docs/bpmn/gestion-incidentes-red_1.bpmn?url'

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

// nombre + primer apellido: "Alvaro Ariel Torrez Calle" → "AT"
const initials = name => { const w = name.split(' '); return w[0][0] + w[Math.max(1, w.length - 2)][0] }

const FOTOS = `${import.meta.env.BASE_URL}img/fotos/`

const Avatar = ({ p, size = 48 }) => p.foto
  ? <img className="avatar" src={`${FOTOS}${p.foto}`} alt={p.person} width={size} height={size} />
  : p.photo
    ? <img className="avatar" src={img(p.photo, 200)} alt={p.person} width={size} height={size} />
    : <span className={`avatar initials bg-${p.color}`} style={{ width: size, height: size }}>{initials(p.person)}</span>

const Video = ({ id, title }) => (
  <div className="video">
    <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} loading="lazy" allowFullScreen
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" />
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
  // primera oración destacada, el resto como cuerpo
  const card = (label, when, icon, text, keys, c) => {
    const [first, ...rest] = text.split(/(?<=\.)\s/)
    return (
      <article className={`card mv-card bg-${c}`}>
        <div className="row"><span className="icon">{icon}</span><span className="grow"><b>{label}</b><small>{when}</small></span></div>
        <p className="mv-lead">{first}</p>
        <p>{rest.join(' ')}</p>
        <div className="chips">{keys.map(k => <span key={k} className="chip">{k}</span>)}</div>
      </article>
    )
  }
  const block = (kicker, title, icon, mission, vision) => (
    <section className="wrap">
      <div className="mv">
        <div className="mv-head"><span className="icon">{icon}</span><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div></div>
        <div className="grid g2">
          {card('Misión', 'Lo que hacemos hoy', '◎', ...mission)}
          {card('Visión', 'A dónde queremos llegar', '➚', ...vision)}
        </div>
      </div>
    </section>
  )
  return (
    <>
      <Hero tint="green" eyebrow="Misión y visión" title="Conectamos personas, datos y oportunidades"
        sub="La misión es quiénes somos hoy; la visión, a dónde queremos llegar." />
      {block('IATECH', 'La empresa', '▦',
        ['Nuestra misión es transformar la prestación de servicios médicos mediante el desarrollo de soluciones de software innovadoras que prioricen los resultados (outcomes) sobre los simples entregables. Nos comprometemos a actuar como administradores (stewards) diligentes y éticos, garantizando la integridad de los datos de salud y el cumplimiento riguroso de las normativas de seguridad, para entregar un valor tangible que mejore la calidad de vida de los pacientes y la eficiencia de los profesionales médicos.',
          ['Software médico', 'Ética', 'Datos de salud'], 'yellow'],
        ['Consolidarnos como un sistema de entrega de valor líder en el sector salud global, capaz de navegar la complejidad y la incertidumbre tecnológica con adaptabilidad y resiliencia. Aspiramos a definir el futuro de la tecnología médica, integrando enfoques de desarrollo híbridos que aseguren la calidad total y permitan a las instituciones de salud alcanzar su estado futuro deseado a través de la mejora continua y el aprendizaje organizacional.',
          ['Liderazgo global', 'Resiliencia', 'Mejora continua'], 'blue'])}
      {block('Departamento de Redes', 'Área de redes', '⇄',
        ['Asegurar una infraestructura de conectividad clínica altamente segura, robusta y permanente que actúe como un administrador responsable (steward) en la protección y transmisión de los datos médicos de nuestros interesados. Nos comprometemos a diseñar y operar redes de telecomunicaciones bajo los más estrictos estándares de calidad, confiabilidad y resiliencia ante fallas, garantizando que cada componente de conectividad interactúe de forma armónica para maximizar la disponibilidad y la entrega de valor real en el cuidado de los pacientes.',
          ['Conectividad clínica', 'Seguridad', 'Disponibilidad'], 'green'],
        ['Ser reconocidos como el estándar en conectividad y telecomunicaciones para el sector de salud digital, liderando la adopción de redes inteligentes capaces de navegar la complejidad de entornos hospitalarios distribuidos y cambiantes. Aspiramos a consolidar una arquitectura de red proactiva que optimice constantemente la respuesta ante riesgos y amenazas de seguridad, adoptando un enfoque de pensamiento sistémico y una cultura de adaptabilidad tecnológica para facilitar las innovaciones clínicas del futuro de forma ininterrumpida.',
          ['Redes inteligentes', 'Proactividad', 'Innovación clínica'], 'pink'])}
      <section className="wrap">
        <Head kicker="Valores" title="Lo que nos guía" />
        <div className="values">
          {[['Integridad', 'yellow'], ['Innovación', 'lilac'], ['Seguridad', 'pink'], ['Trabajo en equipo', 'green'], ['Orientación al cliente', 'blue'], ['Mejora continua', 'peach']].map(([v, c]) => <span key={v} className={`bg-${c}`}>{v}</span>)}
        </div>
      </section>
      <section className="wrap split">
        <div>
          <Head kicker="Cómo se construyen" title="Del taller a la declaración" />
          <ol className="steps">
            {['Analizar el propósito, clientes y entorno (FODA)', 'Responder las preguntas clave en equipo', 'Redactar borradores breves y claros', 'Validar con los interesados y ajustar', 'Comunicar y revisar cada año'].map(s => <li key={s}>{s}</li>)}
          </ol>
        </div>
        <img className="photo" src={img('1552664730-d307ca884978')} alt="Equipo en un taller frente a una pizarra" />
      </section>
      <section className="wrap">
        <div className="grid g2">
          <article className="card bg-yellow"><span className="icon">◎</span><h3>Misión: el presente</h3>
            <ul>{['¿Qué hacemos?', '¿Para quién lo hacemos?', '¿Cómo lo hacemos?', '¿Qué valor aportamos?'].map(q => <li key={q}>{q}</li>)}</ul>
          </article>
          <article className="card bg-blue"><span className="icon">➚</span><h3>Visión: el futuro</h3>
            <ul>{['¿Qué queremos llegar a ser?', '¿En qué plazo (3–5 años)?', '¿Dónde queremos ser referentes?', '¿Inspira y es alcanzable?'].map(q => <li key={q}>{q}</li>)}</ul>
          </article>
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Videos" title="Aprende a redactarlas" />
        <div className="grid g2">
          <Video id="d-IqjXIgyJg" title="Cómo hacer una Misión" />
          <Video id="Lk6OfqndH1k" title="Cómo hacer una Visión" />
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
      <Hero tint="peach" eyebrow="Organigrama" title="Departamento de Redes" sub="Haz clic en un puesto para ver su descripción oficial.">
        <div className="tree-scroll org-top">
          <ul className="tree org">
            <li>
              <span className="node wide ghost"><span><b>Dirección de Tecnología y Producto</b><small>Nivel directivo</small></span></span>
              <ul><li>{node(lead)}<ul>{team.map(x => <li key={x.clave}>{node(x)}</li>)}</ul></li></ul>
            </li>
          </ul>
        </div>
        <p className="muted hint">¿Todo junto? <a href={`${DOCS}manual-de-funciones.pdf`} target="_blank" rel="noopener">Descargar el manual de funciones (PDF)</a></p>
      </Hero>
      <section className="wrap">
        <Head kicker="Sobre el organigrama" title="Cómo está organizada el área" />
        <div className="grid g4">
          {[
            ['Tipo de estructura', 'Vertical, jerárquica y funcional: cada puesto agrupa una especialidad técnica bajo una sola coordinación.', 'yellow'],
            ['3 niveles', 'Dirección de Tecnología y Producto → Coordinación de Redes (Scrum Master) → equipo técnico.', 'green'],
            [`Tramo de control: ${team.length}`, 'El coordinador supervisa directamente a administración, seguridad y soporte, lo que permite comunicación ágil y sin intermediarios.', 'blue'],
            ['Relaciones funcionales', 'Coordinación horizontal entre los tres roles técnicos y con Infraestructura, Desarrollo, auditoría interna y proveedores de telecomunicaciones.', 'pink'],
          ].map(([t, d, c]) => (
            <article key={t} className={`card bg-${c}`}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
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

const List = ({ items }) => <ul>{items.map(x => <li key={x}>{x}</li>)}</ul>

function Manual({ p }) {
  const sections = [
    ['Propósito del puesto', <p>{p.proposito}</p>],
    ['Ubicación en la estructura', <table><tbody>
      <tr><th>Reporta a</th><td>{p.reportaA}</td></tr>
      <tr><th>Supervisa a</th><td>{p.supervisa.length ? p.supervisa.join(' · ') : 'No tiene personal a cargo'}</td></tr>
      <tr><th>Relaciones funcionales</th><td>{p.funcionales}</td></tr>
    </tbody></table>],
    ['Funciones principales', <ol>{p.funciones.map(x => <li key={x}>{x}</li>)}</ol>],
    ['Responsabilidades', <List items={p.responsabilidades} />],
    ['Nivel de autoridad', <List items={p.autoridad} />],
    ['Perfil requerido', <><List items={p.requisitos} /><div className="chips">{p.competencias.map(c => <span key={c} className={`bg-${p.color}`}>{c}</span>)}</div></>],
    ['Indicadores de desempeño', <table><thead><tr><th>Indicador</th><th>Meta</th></tr></thead><tbody>
      {p.indicadores.map(([k, v]) => <tr key={k}><td>{k}</td><td><b>{v}</b></td></tr>)}
    </tbody></table>],
    ['Condiciones y riesgos', <div className="grid g2"><div><h4>Condiciones de trabajo</h4><List items={p.condiciones} /></div><div><h4>Riesgos laborales</h4><List items={p.riesgos} /></div></div>],
  ]
  return (
    <article className="manual">
      <header className={`bg-${p.color}`}>
        <small>IATECH · Manual institucional de puestos · Departamento de Redes</small>
        <div className="row">
          <Avatar p={p} size={64} />
          <span><h2>{p.denominacion}</h2><p>{p.subtitulo}</p></span>
        </div>
        <dl>
          <div><dt>Código</dt><dd>{p.codigo}</dd></div>
          <div><dt>Categoría</dt><dd>{p.categoria}</dd></div>
          <div><dt>Nivel</dt><dd>{p.nivel}</dd></div>
          <div><dt>Versión</dt><dd>1.0 · Agosto 2026</dd></div>
        </dl>
      </header>
      {sections.map(([t, body], i) => <section key={t}><h3><i>{i + 1}</i>{t}</h3>{body}</section>)}
      <footer>
        <span>Elaborado por<b>Coordinación de Redes</b></span>
        <span>Revisado por<b>Talento Humano</b></span>
        <span>Aprobado por<b>Dirección de Tecnología y Producto</b></span>
      </footer>
    </article>
  )
}

export function Positions() {
  const [open, setOpen] = useState(null)
  const dialog = useRef(null)
  const p = PUESTOS.find(x => x.clave === open)

  useEffect(() => {
    const d = dialog.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <>
      <Hero tint="pink" eyebrow="Descripción de posiciones" title="Cada rol, con propósito" sub="Todas las posiciones del Departamento de Redes. Selecciona un puesto para abrir su manual institucional." />
      <section className="wrap">
        <Head kicker={`${PUESTOS.length} posiciones`} title="Puestos del organigrama" />
        <div className="grid g4">
          {PUESTOS.map(x => (
            <button key={x.clave} className={`card pos bg-${x.color}`} onClick={() => setOpen(x.clave)} aria-haspopup="dialog">
              <Avatar p={x} size={56} />
              <small>{x.codigo} · {x.nivel}</small>
              <h3>{x.denominacion}</h3>
              <p>{x.proposito}</p>
              <span className="pos-foot">Reporta a: {x.reportaA}</span>
              <span className="pos-link">Ver manual →</span>
            </button>
          ))}
        </div>
      </section>
      <dialog ref={dialog} className="doc" aria-label={p && `Manual: ${p.denominacion}`} onClose={() => setOpen(null)}
        onClick={e => e.target === e.currentTarget && setOpen(null)}>
        {p && <>
          <header>
            <span><b>Manual institucional</b><small>{p.codigo} · {p.denominacion}</small></span>
            <button className="btn outline" onClick={() => window.print()}>Imprimir</button>
            <button className="btn dark" onClick={() => setOpen(null)} aria-label="Cerrar">✕</button>
          </header>
          <div className="doc-body"><Manual p={p} /></div>
        </>}
      </dialog>
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
        <Head kicker="Departamento de Redes" title="Nuestro equipo" sub="Perfiles de cada integrante del organigrama. Usamos MBTI para mejorar la comunicación, nunca para seleccionar ni descartar personas." />
        <div className="grid team">
          {PUESTOS.map(p => {
            const g = groupOf(p.mbti)
            return (
              <article key={p.clave} className="card white">
                <div className="row">
                  <Avatar p={p} size={52} />
                  <span className="grow"><b>{p.person}</b><small className="muted">{p.denominacion}</small></span>
                  <span className={`tag bg-${g[1]}`}>{p.mbti}</span>
                </div>
                <div className="letters">
                  {[...p.mbti].map((l, i) => {
                    const d = DICHOTOMIES[i]
                    return <span key={i} className={`bg-${d[5]}`}><b>{l}</b>{l === d[0] ? d[1] : d[3]}</span>
                  })}
                </div>
                <h4>{p.alias} · <span className="muted">{g[0]}</span></h4>
                <p>{p.perfil}</p>
                <div className="grid g2 profile">
                  <div><h4>Fortalezas</h4><ul>{p.fortalezas.map(x => <li key={x}>{x}</li>)}</ul></div>
                  <div><h4>Retos</h4><ul>{p.retos.map(x => <li key={x}>{x}</li>)}</ul></div>
                </div>
                <p className={`card sm bg-${p.color}`}><b>Cómo comunicarte:</b> {p.comunicacion}</p>
              </article>
            )
          })}
        </div>
        <div className="grid g3 tips">
          {[['Comunicación', 'Tres de cuatro son introvertidos (I): agenda y contexto por escrito antes de las reuniones.', 'blue'], ['Decisiones', 'Predomina el pensamiento (T); el coordinador (F) aporta la mirada del impacto en las personas.', 'pink'], ['Proyectos', 'Perfiles J planifican el sprint; el perfil P de soporte aporta flexibilidad ante incidentes.', 'yellow']].map(([t, d, c]) => (
            <div key={t} className={`card sm bg-${c}`}><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>
      </section>
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
    </>
  )
}

/* ---------- 8. Scrum + Kanban ---------- */

const COLUMNS = [['backlog', 'Backlog', 'lilac'], ['todo', 'Por hacer', 'blue'], ['doing', 'En progreso', 'yellow'], ['review', 'Revisión', 'pink'], ['done', 'Hecho', 'green']]
// Tareas del sprint repartidas según los puestos del organigrama (PUESTOS)
const ROLE_SHORT = { coordinador: 'Coordinación', administrador: 'Administración', seguridad: 'Seguridad', soporte: 'Soporte' }
const INITIAL_TASKS = [
  ['Sprint Planning y objetivo del Sprint 4', 'done', 'coordinador'],
  ['Cerrar acciones de la retrospectiva del Sprint 3', 'done', 'coordinador'],
  ['Actualizar firmware de switches core', 'done', 'administrador'],
  ['Respaldo automático de configuraciones con Ansible', 'done', 'administrador'],
  ['Hardening de routers de borde', 'done', 'seguridad'],
  ['Alertas de latencia y caída de enlaces en Zabbix', 'done', 'soporte'],
  ['Aprobar ventana de mantenimiento del core', 'review', 'coordinador'],
  ['Dashboard Grafana de enlaces WAN', 'review', 'soporte'],
  ['Configurar VLAN de invitados', 'doing', 'administrador'],
  ['Autenticación 802.1X en red cableada', 'doing', 'seguridad'],
  ['Escaneo de vulnerabilidades trimestral', 'todo', 'seguridad'],
  ['Actualizar base de conocimiento de soporte N1', 'todo', 'soporte'],
  ['Remover impedimento: demora del proveedor de enlace', 'todo', 'coordinador'],
  ['Rediseñar direccionamiento de la sucursal Norte', 'backlog', 'administrador'],
  ['Simulacro de respuesta a incidentes', 'backlog', 'seguridad'],
  ['Inventario físico de gabinetes y cableado', 'backlog', 'soporte'],
].map(([title, col, who], i) => ({ id: i + 1, title, col, who }))

function Kanban() {
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('iatech-kanban-v2')) || INITIAL_TASKS } catch { return INITIAL_TASKS }
  })
  const [text, setText] = useState('')
  const [role, setRole] = useState('coordinador')
  const [over, setOver] = useState(null)
  const [dragging, setDragging] = useState(null)
  const done = tasks.filter(t => t.col === 'done').length
  const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0

  useEffect(() => { try { localStorage.setItem('iatech-kanban-v2', JSON.stringify(tasks)) } catch { /* storage blocked */ } }, [tasks])

  const move = (id, col) => setTasks(ts => ts.map(t => t.id === id ? { ...t, col } : t))
  const add = e => {
    e.preventDefault()
    if (!text.trim()) return
    setTasks(ts => [...ts, { id: Date.now(), title: text.trim(), col: 'backlog', who: role }])
    setText('')
  }

  return (
    <>
      <div className="goal">
        <div className="goal-line"><b>Avance del sprint</b><span>{done} de {tasks.length} tareas hechas · {pct}%</span></div>
        <div className="bar"><span className="bg-green" style={{ width: `${pct}%` }} /></div>
      </div>
      <form className="add" onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Nueva tarea para el backlog…" aria-label="Nueva tarea" />
        <select value={role} onChange={e => setRole(e.target.value)} aria-label="Responsable">
          {PUESTOS.map(p => <option key={p.clave} value={p.clave}>{ROLE_SHORT[p.clave]}</option>)}
        </select>
        <button className="btn dark">Agregar</button>
        <button type="button" className="btn outline" onClick={() => setTasks(INITIAL_TASKS)}>Reiniciar</button>
      </form>
      <div className="board">
        {COLUMNS.map(([id, name, c]) => {
          const list = tasks.filter(t => t.col === id)
          return (
            <div key={id} className={`col bg-${c} ${over === id ? 'over' : ''}`}
              onDragOver={e => { e.preventDefault(); setOver(id) }}
              onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOver(null) }}
              onDrop={e => { move(Number(e.dataTransfer.getData('text')), id); setOver(null) }}>
              <h4>{name} <span>{list.length}</span></h4>
              {list.map(t => {
                const p = PUESTOS.find(x => x.clave === t.who) ?? PUESTOS[0]
                return (
                <div key={t.id} className={`task ${t.col === 'done' ? 'done' : ''} ${dragging === t.id ? 'dragging' : ''}`} draggable
                  onDragStart={e => { e.dataTransfer.setData('text', t.id); e.dataTransfer.effectAllowed = 'move'; setTimeout(() => setDragging(t.id)) }}
                  onDragEnd={() => { setDragging(null); setOver(null) }}>
                  <button className="task-del" aria-label="Eliminar tarea" onClick={() => setTasks(ts => ts.filter(x => x.id !== t.id))}>×</button>
                  <p>{t.col === 'done' && '✓ '}{t.title}</p>
                  <div className="task-foot">
                    <span className={`who bg-${p.color}`} title={p.denominacion}>{p.icon} {ROLE_SHORT[p.clave]}</span>
                  </div>
                </div>
                )
              })}
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
        <Head kicker="Tablero Kanban · Departamento de Redes" title="Sprint 4 en curso" sub="Tareas asignadas a cada puesto del organigrama. Arrastra las tarjetas entre columnas; los cambios se guardan en tu navegador." />
        <Kanban />
      </section>
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
    </>
  )
}

/* ---------- 9. BPMN ---------- */

const WIKI = 'https://upload.wikimedia.org/wikipedia/commons/'
const BPMN_VIDEOS = [
  { id: 'NIMRIVpyKIY', tag: '2 min', title: 'BPMN – Qué es y para qué sirve' },
  { id: 'k8pqgMgKxmA', tag: 'Conceptos', title: '¿En qué consiste la notación BPMN 2.0?' },
  { id: 'BbT0IN3y2V4', tag: 'Tutorial', title: 'Modela fácilmente tus procesos en BPMN 2.0' },
  { id: '2lmRwrl7-MY', tag: 'Lógica', title: 'Entiende la lógica de los pasos de un proceso' },
]
const NOTATION = [
  ['Eventos', '○', 'Círculos que marcan lo que ocurre: inicio (borde fino), intermedio (doble) y fin (borde grueso).', 'green'],
  ['Actividades', '▭', 'Rectángulos redondeados con el trabajo a realizar: tareas de usuario, de servicio, manuales o de envío.', 'blue'],
  ['Compuertas', '◇', 'Rombos donde el flujo se divide o se une según una decisión (exclusiva, paralela o inclusiva).', 'yellow'],
  ['Flujos y carriles', '≡', 'Flechas que ordenan los pasos; pools y lanes indican qué participante o área es responsable.', 'pink'],
]
const LANES = [
  ['Usuario', 'peach', ['Reporta el incidente de red', 'Recibe la notificación de cierre']],
  ['Mesa de Ayuda', 'lilac', ['Registra el ticket', 'Clasifica y prioriza', '¿Es de red? Si no, escala a otra área', 'Cierra el ticket y notifica']],
  ['Equipo de Redes', 'green', ['Diagnostica la falla', '¿En sitio? Programa visita y resuelve', 'Si no, resuelve de forma remota', 'Verifica el restablecimiento']],
]

function BpmnDiagram() {
  const box = useRef(null)
  const viewer = useRef(null)
  const [status, setStatus] = useState('Cargando diagrama…')

  useEffect(() => {
    let v, dead = false
    // carga diferida: bpmn-js solo se descarga al abrir esta sección
    Promise.all([import('bpmn-js/lib/NavigatedViewer'), fetch(DIAGRAM_URL).then(r => r.text()), import('bpmn-js/dist/assets/diagram-js.css'), import('bpmn-js/dist/assets/bpmn-js.css')])
      .then(async ([{ default: Viewer }, xml]) => {
        if (dead) return
        v = viewer.current = new Viewer({ container: box.current })
        await v.importXML(xml)
        v.get('canvas').zoom('fit-viewport')
        setStatus(null)
      })
      .catch(() => !dead && setStatus('No se pudo cargar el diagrama.'))
    return () => { dead = true; v?.destroy() }
  }, [])

  const zoom = f => { const c = viewer.current?.get('canvas'); if (c) c.zoom(f ? c.zoom() * f : 'fit-viewport') }

  return (
    <div className="bpmn">
      <div className="bpmn-tools">
        <button className="btn outline" onClick={() => zoom(1.2)} aria-label="Acercar">+</button>
        <button className="btn outline" onClick={() => zoom(1 / 1.2)} aria-label="Alejar">−</button>
        <button className="btn outline" onClick={() => zoom()}>Ajustar</button>
        <a className="btn outline" href={DIAGRAM_URL} download="gestion-incidentes-red.bpmn">Descargar .bpmn</a>
      </div>
      {status && <p className="bpmn-status muted">{status}</p>}
      <div ref={box} className="bpmn-canvas" />
    </div>
  )
}

export function Bpmn() {
  const [video, setVideo] = useState(BPMN_VIDEOS[0])
  return (
    <>
      <Hero tint="blue" eyebrow="BPMN" title="Procesos que todos pueden leer"
        sub="Business Process Model and Notation: el estándar para dibujar cómo fluye el trabajo entre personas, áreas y sistemas." />
      <section className="wrap">
        <Head kicker="Nuestro proceso" title="Gestión de incidentes de red" sub="Arrastra para moverte y usa Ctrl + rueda del ratón (o los botones) para hacer zoom." />
        <BpmnDiagram />
        <div className="grid g3 tips">
          {LANES.map(([n, c, steps]) => (
            <article key={n} className={`card sm bg-${c}`}><span className="eyebrow">Carril</span><h3>{n}</h3><ol className="lane-steps">{steps.map(s => <li key={s}>{s}</li>)}</ol></article>
          ))}
        </div>
      </section>
      <section className="wrap split">
        <div>
          <Head kicker="¿Qué es BPMN?" title="Un lenguaje común para los procesos" />
          <p className="muted">BPMN es una notación gráfica estandarizada por el Object Management Group (OMG) e ISO/IEC 19510. La versión 2.0 define símbolos y reglas precisas para que analistas, técnicos y directivos entiendan el mismo diagrama sin ambigüedad, e incluso para que un motor de procesos pueda ejecutarlo.</p>
        </div>
        <ol className="steps">
          {['Documenta cómo se trabaja hoy', 'Detecta cuellos de botella y responsables', 'Alinea a negocio y tecnología', 'Base para automatizar procesos'].map(s => <li key={s}>{s}</li>)}
        </ol>
      </section>
      <section className="wrap">
        <Head kicker="Notación" title="Los elementos básicos" />
        <div className="grid g4">
          {NOTATION.map(([t, i, d, c]) => (
            <article key={t} className={`card bg-${c}`}><span className="icon">{i}</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Videos" title="Aprende BPMN en minutos" />
        <div className="player">
          <Video id={video.id} title={video.title} />
          <ul className="playlist">
            {BPMN_VIDEOS.map(v => (
              <li key={v.id}><button className={v.id === video.id ? 'active' : ''} onClick={() => setVideo(v)}>
                <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" /><span><small>{v.tag}</small>{v.title}</span>
              </button></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Galería" title="BPMN en imágenes" sub="Ejemplos de diagramas · Wikimedia Commons." />
        <div className="gallery contain">
          {[['9/98/Quotation_BPMN_Example2.png', 'Proceso de cotización'], ['9/90/A_simple_BPMN_diagram_that_depicts_the_interaction_between_two_parties.png', 'Colaboración entre dos participantes'], ['5/55/BPMN-Swimlanes.jpg', 'Pools y carriles']].map(([f, t]) => (
            <figure key={f}><img src={WIKI + f} alt={`Diagrama BPMN: ${t}`} loading="lazy" /><figcaption>{t}</figcaption></figure>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- 10. Goals ---------- */

// derivados de los objetivos, misión y visión de cada rol
const COMPANY_GOALS = [
  ['Entrega ágil de valor', 'Un equipo de Redes autoorganizado que cumple sus sprints alineado a las prioridades de la empresa.', 'yellow'],
  ['Infraestructura escalable', 'Una red estable, documentada y automatizada, lista para crecer sin interrupciones.', 'blue'],
  ['Seguridad Zero Trust', 'Detectar y contener amenazas a tiempo con una cultura de seguridad compartida.', 'pink'],
  ['Servicio proactivo', 'Anticipar fallas y resolver incidentes antes de que afecten a los usuarios.', 'green'],
]

export function Goals() {
  const areas = ['Todas', ...new Set(PUESTOS.map(p => p.categoria))]
  const [area, setArea] = useState('Todas')
  const people = PUESTOS.filter(p => area === 'Todas' || p.categoria === area)
  return (
    <>
      <Hero tint="green" eyebrow="Objetivos" title="Objetivos claros, responsables claros" sub="Objetivos estratégicos de la empresa y el objetivo, misión y visión de cada rol." />
      <section className="wrap">
        <Head kicker="Empresa" title="Objetivos estratégicos" />
        <div className="grid g4">
          {COMPANY_GOALS.map(([t, d, c], i) => (
            <article key={t} className={`card bg-${c}`}>
              <strong className="num">0{i + 1}</strong><h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <Head kicker="Asignación de personal" title="Objetivo, misión y visión por rol" />
        <div className="pills">
          {areas.map(a => <button key={a} className={a === area ? 'active' : ''} onClick={() => setArea(a)}>{a}</button>)}
        </div>
        <div className="grid g2">
          {people.map(p => (
            <article key={p.clave} className={`card bg-${p.color}`}>
              <div className="row"><Avatar p={p} size={48} /><span className="grow"><b>{p.person}</b><small className="muted">{p.denominacion}</small></span></div>
              {[['Objetivo', p.objetivo], ['Misión', p.mision], ['Visión', p.vision]].map(([k, v]) => (
                <div key={k} className="goal mvv"><span className="eyebrow">{k}</span><p>{v}</p></div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
