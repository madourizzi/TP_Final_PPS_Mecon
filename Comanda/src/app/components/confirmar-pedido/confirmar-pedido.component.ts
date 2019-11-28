import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MesasService } from 'src/app/services/mesas.service';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/models/pedido';


@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.scss'],
})
export class ConfirmarPedidoComponent implements OnInit {

  @Input() pedidoAConfirmar: Pedido;
  pedidoCOnfirmado:boolean;
  total:number;
/*   @Input() backButton: Boolean;

  @Output() volver:  EventEmitter<any> = new EventEmitter()
 */

  constructor(private mesaServicio: MesasService, private pedidoServ: PedidosService) {

    this.pedidoCOnfirmado=false;
    this.total=0;
  
   }

  ngOnInit() {}

  eliminar(prod)
  {
   console.log("producto a eliminar" + prod);
   this.pedidoAConfirmar.productos.splice(this.pedidoAConfirmar.productos.indexOf(prod), 1);
  }

  confirmar()  {
    console.log("CONFIRMAAAAAAAAAAR");
    
    this.pedidoAConfirmar.productos.map((e:Producto)=>{
      this.total+= e.precio;
    });
    this.pedidoCOnfirmado=true;
    this.mesaServicio.mesaActual.pedidos = this.pedidoServ.crearPedidoXArea(this.pedidoAConfirmar, this.mesaServicio.mesaActual);
    this.mesaServicio.actualizarMesa(this.mesaServicio.mesaActual, "pedidoAConfirmar" );  

  }

}
