import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Pedido } from 'src/app/models/pedido';
import { Mesa } from 'src/app/models/mesa';
import { ToastService } from 'src/app/services/toast.service';
import { JuegosService } from 'src/app/juegos/services/juegos.service';



@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
})
export class DetalleCuentaComponent implements OnInit {

  mesa: Mesa;
  total = 0;
  totalTotal=0;
  totalDesc=0;
  totaProp=0;
  todosPedidos: Array<Producto>
  constructor(private pedidServicio: PedidosService,
    private toast: ToastService, private mesasServ: MesasService,public juegosServicio: JuegosService
   ) {
    this.todosPedidos = new Array();
  }

  ngOnInit() {
    this.mesa = this.mesasServ.mesaActual;
    this.mesa.descuento = this.juegosServicio.aplicarDescuento();
    console.log("this.mesa.descuento", this.mesa.descuento);    
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
         
            this.totalDesc = this.total * (this.mesa.descuento / 100);
            this.totaProp = this.total * (this.mesa.propina / 100);
            this.total= this.total - this.totalDesc+this.totaProp;
            if(this.mesa.estado!= 'pagoEnviado')
            {
              this.mesasServ.actualizarMesaMozo(this.mesa, "pagando");
            }
           
          
        }
      })
    );
  }
}



