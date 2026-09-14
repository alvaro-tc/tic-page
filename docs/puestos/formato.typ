// =============================================================
//  Réplica fiel del formato de docs/ejemplo.docx
//  Extraído del OOXML original:
//    · Página A4 · márgenes sup/inf 2.5 cm, izq/der 3.0 cm (ancho útil 15 cm)
//    · Times New Roman 12 pt · interlineado sencillo
//    · Tablas de 15 cm, bordes negros de 1 pt, margen de celda 5 pt
//    · Encabezados de sección: relleno #6d9eeb, negrita, centrado
//    · Encabezado "Organigrama": relleno #4a86e8
//    · Identificación: fila de cabecera #d5a6bd (2 col) y #e4a3cb (3 col)
//    · Viñetas: ● con sangría 1,27 cm / francesa 0,635 cm
//  Sin carátula, sin encabezado y sin pie de página (el original no los tiene).
// =============================================================

#let azul-seccion = rgb("#6d9eeb")
#let azul-organigrama = rgb("#4a86e8")
#let rosa-1 = rgb("#d5a6bd")
#let rosa-2 = rgb("#e4a3cb")

#let ancho = 15cm
#let borde = 1pt + black
#let margen-celda = 5pt

// Párrafo vacío de 12 pt que el original coloca entre cada tabla
#let separador = v(13.8pt, weak: false)

#let documento(titulo: "", doc) = {
  set document(title: titulo, author: "")
  set page(
    paper: "a4",
    // web=1 → una sola página continua (vista rápida en la web)
    height: if "web" in sys.inputs { auto } else { 29.7cm },
    margin: (top: 2.5cm, bottom: 2.5cm, left: 3cm, right: 3cm),
    header: none,
    footer: none,
  )
  set text(font: ("Times New Roman",), size: 12pt, fill: black, lang: "es")
  set par(leading: 0.65em, spacing: 0.65em, justify: false)
  set list(marker: text(size: 12pt)[●], indent: 0.635cm, body-indent: 0.3cm)
  doc
}

// ---- Encabezado de sección: tabla de una celda con relleno ----
#let encabezado(texto, relleno: azul-seccion) = {
  table(
    columns: (ancho,),
    stroke: borde,
    inset: margen-celda,
    align: center,
    table.cell(fill: relleno)[#text(weight: "bold")[#texto]],
  )
}

// ---- Celda de contenido: tabla de una celda en blanco ----
#let contenido(cuerpo) = {
  table(
    columns: (ancho,),
    stroke: borde,
    inset: margen-celda,
    align: left,
    table.cell(fill: white)[#cuerpo],
  )
}

// ---- Lista de viñetas tal como aparece en el original ----
#let puntos(items) = list(..items)

// ---- Bloque completo: encabezado + separador + contenido ----
#let seccion(titulo, cuerpo, relleno: azul-seccion) = {
  encabezado(titulo, relleno: relleno)
  separador
  contenido(cuerpo)
  separador
}

// ---- Tablas de identificación del puesto ----
#let identificacion(denominacion, categoria, departamento, titulares, jornada) = {
  table(
    columns: (ancho * 0.5, ancho * 0.5),
    stroke: borde,
    inset: margen-celda,
    align: left,
    table.cell(fill: rosa-1)[Denominación del puesto],
    table.cell(fill: rosa-1)[Categoría laboral],
    table.cell(fill: white)[#denominacion],
    table.cell(fill: white)[#categoria],
  )
  separador
  table(
    columns: (ancho * 0.44, ancho * 0.3067, ancho * 0.2533),
    stroke: borde,
    inset: margen-celda,
    align: left,
    table.cell(fill: rosa-2)[Departamento],
    table.cell(fill: rosa-2)[N° de Titulares],
    table.cell(fill: rosa-2)[Jornada Laboral],
    table.cell(fill: white)[#departamento],
    table.cell(fill: white)[#titulares],
    table.cell(fill: white)[#jornada],
  )
  separador
}

// ---- Organigrama del departamento, resaltando el puesto actual ----
#let organigrama(actual) = {
  import "typst/puestos.typ": coordinador, administrador, seguridad, soporte
  let caja(t, activo: false) = box(
    width: 100%, inset: 6pt, stroke: 1pt + black,
    fill: if activo { azul-seccion } else { white },
    align(center, text(size: 10pt, weight: if activo { "bold" } else { "regular" }, t)),
  )
  let bajada = align(center, line(length: 12pt, angle: 90deg))
  let fila(cuerpo) = grid.cell(colspan: 3, cuerpo)
  let centro(cuerpo) = fila(align(center, box(width: 45%, cuerpo)))
  grid(
    columns: (1fr, 1fr, 1fr),
    centro(caja[Dirección de Tecnología y Producto]),
    fila(bajada),
    centro(caja(coordinador.denominacion, activo: actual == coordinador.clave)),
    fila(bajada),
    // horizontal entre los centros de la primera y la última columna
    fila(align(center, line(length: 66.67%))),
    ..(administrador, seguridad, soporte).map(_ => bajada),
    ..(administrador, seguridad, soporte).map(q => pad(x: 4pt, caja(q.denominacion, activo: actual == q.clave))),
  )
}

// ---- Descripción completa de un puesto ----
#let describir-puesto(p) = {
  encabezado("Identificación del puesto")
  separador
  identificacion(p.denominacion, p.categoria, p.departamento, p.titulares, p.jornada)

  seccion("Finalidad", puntos(p.finalidad))

  encabezado("Organigrama", relleno: azul-organigrama)
  separador
  contenido(organigrama(p.clave))
  separador

  seccion("Áreas de eficiencia/ resultado", puntos(p.areas))
  seccion("Funciones específicas del cargo", puntos(p.funciones))
  seccion(
    "Relaciones",
    puntos((
      [*Relaciones jerárquicas:* #p.rel-jerarquicas],
      [*Relaciones funcionales:* #p.rel-funcionales],
    )),
  )
  seccion("Responsabilidad", puntos(p.responsabilidad))
  seccion("Condiciones de trabajo", puntos(p.condiciones))
  seccion("Riesgos potenciales", puntos(p.riesgos))
  seccion("Requerimientos del puesto", puntos(p.requerimientos))
  seccion("Competencias profesionales", puntos(p.competencias))
}
