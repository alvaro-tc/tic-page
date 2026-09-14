import { useEffect, useState } from 'react'
import * as P from './pages.jsx'

const PAGES = [
  ['inicio', 'Inicio', P.Home],
  ['tecnologias', 'Tecnologías', P.Tech],
  ['cti', 'Ciencia e Innovación', P.Science],
  ['mision', 'Misión y Visión', P.Mission],
  ['organigrama', 'Organigrama', P.OrgChart],
  ['posiciones', 'Posiciones', P.Positions],
  ['mbti', 'MBTI', P.Mbti],
  ['scrum', 'Scrum', P.Scrum],
  ['bpmn', 'BPMN', P.Bpmn],
  ['objetivos', 'Objetivos', P.Goals],
]

export function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x="18" y="2" width="4" height="12" rx="2" fill="currentColor" transform={`rotate(${i * 30} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5" fill="currentColor" />
    </svg>
  )
}

export default function App() {
  const read = () => location.hash.slice(1) || 'inicio'
  const [page, setPage] = useState(read)

  useEffect(() => {
    const onHash = () => { setPage(read()); window.scrollTo(0, 0) }
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])

  const Current = (PAGES.find(p => p[0] === page) ?? PAGES[0])[2]

  return (
    <>
      <header className="top">
        <a href="#inicio" className="brand"><Logo /><b>IATECH</b></a>
        <nav className="tabs" aria-label="Secciones">
          {PAGES.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={id === page ? 'active' : ''} aria-current={id === page ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
      </header>
      <main><Current /></main>
      <footer className="foot">
        <Logo /> <span>© {new Date().getFullYear()} IATECH · Soluciones en redes y conectividad</span>
      </footer>
    </>
  )
}
