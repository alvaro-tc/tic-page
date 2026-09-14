#import "formato.typ": documento, describir-puesto
#import "typst/puestos.typ": soporte

#show: documento.with(titulo: "Descripción de Puesto — " + soporte.denominacion)

#describir-puesto(soporte)
