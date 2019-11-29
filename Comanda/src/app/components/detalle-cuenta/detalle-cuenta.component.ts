import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Pedido } from 'src/app/models/pedido';
import { Mesa } from 'src/app/models/mesa';


@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
})
export class DetalleCuentaComponent implements OnInit {
 
  mesa: Mesa;
  total = 0;
  todosPedidos: Array<Producto>
  constructor(private pedidServicio: PedidosService, private mesasServ:MesasService) {
    this.todosPedidos = new Array();
  }

  ngOnInit() {
    this.mesa= this.mesasServ.mesaActual;
    this.calcularCuenta();
    
  }

  calcularCuenta() {
    this.mesa.pedidos.forEach((pedido) => {

      this.pedidServicio.traerUnPedido(pedido).subscribe((pedidoDb: Pedido) => {
        console.log("pedidodb", pedidoDb);        
        if (pedidoDb.estado == 'terminado' || pedidoDb.estado == 'entregado') {
          pedidoDb.productos.forEach((e: Producto) => {
            this.todosPedidos.push(e);
            this.total += e.stock;
          })

        }
      });


    })
  }
}



