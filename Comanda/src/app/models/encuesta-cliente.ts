export class EncuestaCliente {
    uid;
    cliente;
    valorMozo;
    valorCocinero;
    valorBartender;
    valorMesa;
    valorRestaurant;
    sugerencia;
    fotos: Array<string>;


    constructor(
      uid?: string,
      cliente?: string,

      valorMozo?: number,
      valorCocinero?: number,
      valorBartender?: number,
      valorMesa?: number,
      valorRestaurant?: number,
      sugerencia?: number
    ){
      this.uid = uid;
        this.cliente = cliente;
        this.valorMozo = valorMozo;
        this.valorCocinero = valorCocinero;
        this.valorBartender = valorBartender;
        this.valorMesa = valorMesa;
        this.valorRestaurant = valorRestaurant;
        this.sugerencia = sugerencia;
    }

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
      }
}
