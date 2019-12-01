import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadosMesaPipe'
})
export class EstadosMesaPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case "pendiente":
        return "Pendiente";
        break;
      case "enPreparacion":
        return "Pronto estará listo";
        break;
      case "terminado":
        return "Listo para entregar";
        break;
      case "entregado":
        return "Pedido Cerrado";
        break;
      case "esperandoComida":
        return "Pedido Cerrado";
        break;
        default:
          return value;


    }
  }

}
