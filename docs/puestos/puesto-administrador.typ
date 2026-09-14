#import "formato.typ": documento, describir-puesto
#import "typst/puestos.typ": administrador

#show: documento.with(titulo: "Descripción de Puesto — " + administrador.denominacion)

#describir-puesto(administrador)
