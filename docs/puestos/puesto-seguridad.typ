#import "formato.typ": documento, describir-puesto
#import "typst/puestos.typ": seguridad

#show: documento.with(titulo: "Descripción de Puesto — " + seguridad.denominacion)

#describir-puesto(seguridad)
