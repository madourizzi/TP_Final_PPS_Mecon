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

  /*
  public uid;
  public id_cliente;
  public pedidos: Array<Pedido>;
  public estado;*/

    constructor() {}

    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }

}
