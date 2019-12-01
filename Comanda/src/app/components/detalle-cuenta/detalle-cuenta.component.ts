import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Pedido } from 'src/app/models/pedido';
import { Mesa } from 'src/app/models/mesa';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
})
export class DetalleCuentaComponent implements OnInit {

  mesa: Mesa;
  total = 0;
  todosPedidos: Array<Producto>
  constructor(private pedidServicio: PedidosService,
    private toast: ToastService, private mesasServ: MesasService) {
    this.todosPedidos = new Array();
  }

  ngOnInit() {
    this.mesa = this.mesasServ.mesaActual;
    
    this.calcularCuenta();
  }

  enviarPago()
  {
    this.mesasServ.actualizarMesaMozo(this.mesa, 'pagoEnviado');
  }

  async propina() {
    this.mesa.propina = await this.mesasServ.propinaQr();
    if (this.mesa.propina != 0) {
      this.calcularCuenta();
    }
  }

  calcularCuenta() {
    this.mesa.pedidos.forEach((pedido) =>
      this.pedidServicio.traerUnPedido(pedido).subscribe((pedidoDb: Pedido) => {
        console.log("pedidodb", pedidoDb);
        if (pedidoDb.estado == 'terminado' || pedidoDb.estado == 'entregado') {
          pedidoDb.productos.forEach((e: Producto) => {
            this.todosPedidos.push(e);
            this.total += e.stock;
          });
          if (this.mesa.propina >= 0 && this.mesa.propina >= 20 && this.mesa.descuento != null) {
            this.total -= this.total * (this.mesa.descuento / 100);
            this.total += this.total * (this.mesa.propina / 100);
            if(this.mesa.estado!= 'pagoEnviado')
            {
              this.mesasServ.actualizarMesaMozo(this.mesa, "pagando");
            }
           
          }
        }
      })
    );
  }
}



