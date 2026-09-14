// Pre-renders docs/puestos/*.typ into public/puestos: <clave>.svg (one tall page, instant <img>) + <clave>.pdf (download)
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const src = 'docs/puestos'
const out = 'public/puestos'
mkdirSync(out, { recursive: true })

for (const clave of ['coordinador', 'administrador', 'seguridad', 'soporte']) {
  const file = `${src}/puesto-${clave}.typ`
  execFileSync('typst', ['compile', '--root', src, '--input', 'web=1', file, `${out}/${clave}.svg`], { stdio: 'inherit' })
  execFileSync('typst', ['compile', '--root', src, file, `${out}/${clave}.pdf`], { stdio: 'inherit' })
}
execFileSync('typst', ['compile', '--root', src, `${src}/manual-de-funciones.typ`, `${out}/manual-de-funciones.pdf`], { stdio: 'inherit' })
