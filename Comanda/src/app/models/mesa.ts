import { Pedido } from './pedido';

export class Mesa {
  public uid;
  public id_cliente;
  public pedidos: Array<Pedido>;
  public estado;

    constructor() {}

}
