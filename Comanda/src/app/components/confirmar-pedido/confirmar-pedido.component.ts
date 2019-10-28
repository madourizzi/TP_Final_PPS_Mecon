import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.scss'],
})
export class ConfirmarPedidoComponent implements OnInit {

  @Input() pedidoAConfirmar: Array<any>;
  pedidoCOnfirmado:boolean;
/*   @Input() backButton: Boolean;

  @Output() volver:  EventEmitter<any> = new EventEmitter()
 */

  constructor() {
    this.pedidoAConfirmar= new Array();
    this.pedidoCOnfirmado=false;
  
   }

  ngOnInit() {}

  eliminar(prod)
  {
   console.log("producto a eliminar" + prod);
   this.pedidoAConfirmar.splice(this.pedidoAConfirmar.indexOf(prod), 1);
  }

  confirmar()
  {
    this.pedidoCOnfirmado=true;
  }

}
