#import "formato.typ": documento, describir-puesto
#import "typst/puestos.typ": coordinador

#show: documento.with(titulo: "Descripción de Puesto — " + coordinador.denominacion)

#describir-puesto(coordinador)
