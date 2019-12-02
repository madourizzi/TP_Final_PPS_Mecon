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
  pedidoCOnfirmado: boolean;
  total: number;
  acumuladorProductos = 0;
  @Output() final :EventEmitter<any>;
  todo;

  /*   @Input() backButton: Boolean;
  
    @Output() volver:  EventEmitter<any> = new EventEmitter()
   */

  constructor(private mesaServicio: MesasService, private pedidoServ: PedidosService) {

    this.pedidoCOnfirmado = false;
    this.total = 0;
    this.final= new EventEmitter();
    this.todo=true;

  }

  ngOnInit() {
    this.total = 0; 
    this.pedidoAConfirmar.productos.map((e: Producto) => {
      this.total += e.precio;
    })
  }

  eliminar(prod) {
    this.total = 0;
    console.log("producto a eliminar" + prod);
    this.pedidoAConfirmar.productos.splice(this.pedidoAConfirmar.productos.indexOf(prod), 1);
    this.pedidoAConfirmar.productos.map((e: Producto) => {
      this.total += e.precio;
    });
  }

  confirmar() {
    this.pedidoCOnfirmado = true;
    this.mesaServicio.mesaActual.pedidos = this.pedidoServ.crearPedidoXArea(this.pedidoAConfirmar, this.mesaServicio.mesaActual);
    this.mesaServicio.actualizarMesa(this.mesaServicio.mesaActual, "pedidoAConfirmar");
    setTimeout(()=>
    {
      this.final.emit(true);
    } ,6000); 

  }

}
