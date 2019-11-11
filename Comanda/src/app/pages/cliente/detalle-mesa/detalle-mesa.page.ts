import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { UsersService } from 'src/app/services/users.service';
import { Producto } from 'src/app/models/producto';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-detalle-mesa',
  templateUrl: './detalle-mesa.page.html',
  styleUrls: ['./detalle-mesa.page.scss'],
})
export class DetalleMesaPage implements OnInit {

  nroMesa;
  cliente;
  pedidos: Array<Pedido>;

  constructor(
    private pedidoSer: PedidosService, 
    private mesaSer: MesasService, 
    private usuarioSer: UsersService) { }

  ngOnInit() {
    
    this.nroMesa = this.mesaSer.mesaActual;
    this.cliente = this.usuarioSer.traerUsuarioActual();

    this.pedidos = new Array();

    this.nroMesa.pedidos.forEach(element => {
      this.pedidoSer.traerUnPedido(element).subscribe((e: Pedido) => {
        console.log("this.productos= e.productos;", e);
        this.pedidos.push(e);
      });


    });

  }

}
