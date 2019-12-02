import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areasPipe'
})
export class AreasPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case "barra":
        return "Tragos y Vinos";
        break;
      case "postre":
        return "Candy Bar";
        break;
      case "cocina":
      case "comida":
        return "Cocina";
        break;
      case "cerveza":
        return "Patio Cervecero";
      case "aConfirmar":
        return "Esperando Confirmacion";
      case "pendiente":
        return "pendiente";
      case "pendiente":
        return "pendiente";
      case "terminado":
        return "Servido";
      case "entregado":
        return "Servido";
        break;


    }
  }

}
