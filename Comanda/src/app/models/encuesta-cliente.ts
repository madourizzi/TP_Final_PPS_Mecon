export class EncuestaCliente {
    cliente;
    //pedido;
    valorMozo;
    valorCocinero;
    valorBartender;
    valorMesa;
    valorRestaurant;
    sugerencia;

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
      }
}
