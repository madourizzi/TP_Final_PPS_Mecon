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
  pedidos: Array<String>
  descuento: number;
  propina: number;

    constructor() {
      this.cliente="sin asignar";
      this.pedidos= new Array();
      this.descuento=0;
      this.propina=0;
    }

    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }

}
