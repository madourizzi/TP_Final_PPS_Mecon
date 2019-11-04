import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MesasService } from 'src/app/services/mesas.service';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.scss'],
})
export class ConfirmarPedidoComponent implements OnInit {

  @Input() pedidoAConfirmar: Array<any>;
  pedidoCOnfirmado:boolean;
  total:number;
/*   @Input() backButton: Boolean;

  @Output() volver:  EventEmitter<any> = new EventEmitter()
 */

  constructor(private mesaServicio: MesasService) {
    this.pedidoAConfirmar= new Array();
    this.pedidoCOnfirmado=false;
    this.total=0;
  
   }

  ngOnInit() {}

  eliminar(prod)
  {
   console.log("producto a eliminar" + prod);
   this.pedidoAConfirmar.splice(this.pedidoAConfirmar.indexOf(prod), 1);
  }

  confirmar()  {

    this.pedidoAConfirmar.map((e:Producto)=>{
      this.total+= e.precio;
    });

    this.pedidoCOnfirmado=true;
    this.mesaServicio.mesaActual.pedidos = this.pedidoAConfirmar;
    this.mesaServicio.actualizarMesa(this.mesaServicio.mesaActual, "esperandoComida" );

  }

}
