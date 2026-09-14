#import "formato.typ": documento, describir-puesto
#import "typst/puestos.typ": todos

#show: documento.with(titulo: "Descripción de Puestos — Departamento de Redes")

#for (i, p) in todos.enumerate() {
  if i > 0 { pagebreak() }
  describir-puesto(p)
}
