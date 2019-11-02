import { Pedido } from './pedido';
import { User } from './user';

export class Mesa {

  id: string;
  numero: number;         
  cantidadComensales: number;     
  tipoMesa: string;       
  codigoQr: string;  
  estado: string;   //Estados: {"disponible", "ocupada", "reservada" } 
  usuario: User;
  url;

    constructor() {}

    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }

}
