import { Pedido } from './pedido';
import { User } from './user';

export class Mesa {

  uid: string;
  numero: number;         
  cantidadComensales: number;     
  tipoMesa: string;       
  codigoQr: string;  
  estado: string;   //Estados: {"disponible", "ocupada", "reservada" } 
  usuario: User;
  url;
  cliente;

    constructor() {
      this.cliente="sin asignar";
    }

    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }

}
