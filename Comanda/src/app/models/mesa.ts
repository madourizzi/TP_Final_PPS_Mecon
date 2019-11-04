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
  pedidos: Array<Pedido>

    constructor() {
      this.cliente="sin asignar";
      this.pedidos= new Array();
    }

    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }

}
