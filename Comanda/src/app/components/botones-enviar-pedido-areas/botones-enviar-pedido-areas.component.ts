import { Component, OnInit, Input } from '@angular/core';
import { Mesa } from 'src/app/models/mesa';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/models/pedido';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-botones-enviar-pedido-areas',
  templateUrl: './botones-enviar-pedido-areas.component.html',
  styleUrls: ['./botones-enviar-pedido-areas.component.scss'],
})
export class BotonesEnviarPedidoAreasComponent implements OnInit {

  @Input() mesa: Mesa;


  btnPostre;
  btnComida;
  btnCerveza;
  btnTragos;

  contadorPedido = 0;
  contadorPedidoEmitidos = 0;
  pedido: Array<Pedido>;
  constructor(private pedidoServicio: PedidosService, private mesaServicio: MesasService) {

    this.btnPostre = false;
    this.btnComida = false;
    this.btnCerveza = false;
    this.btnTragos = false;
    this.pedido = new Array();

  }

  ngOnInit() {
    this.verAreasPedido(this.mesa);
  }

  verAreasPedido(mesa: Mesa) {
    mesa.pedidos.forEach((pedido) => {      
      this.pedidoServicio.traerUnPedido(pedido).subscribe((pedidoDb: Pedido) => {
        this.verPedido(pedidoDb);
        this.pedido.push(pedidoDb);              
        this.contarEntregado(); 
      });
    });



  }



  verPedido(pedidoDb) {
    if (pedidoDb.estado == "aConfirmar") {
      switch (pedidoDb.area) {
        case 'barra':
          this.btnTragos = pedidoDb;
          this.contadorPedido++;
          break;
        case 'comida':
        case 'cocina':
          this.btnComida = pedidoDb;
          this.contadorPedido++;
          break;
        case 'candyBar':
          this.btnPostre = pedidoDb;
          this.contadorPedido++;
          break;
        case 'cerveza':
          this.btnCerveza = pedidoDb;
          this.contadorPedido++;
          break;
      }
    }

  }


  hacerPedido(uid) {
    this.pedidoServicio.actualizarUnPedido(uid, 'pendiente');
    switch (uid.area) {
      case 'barra':
        this.btnTragos = false;
        break;
      case 'comida':
      case 'cocina':
        this.btnComida = false;
        break;
      case 'postre':
        this.btnPostre = false;
        break;
      case 'cerveza':
        this.btnCerveza = false;
        break;
    }

    this.contadorPedidoEmitidos++;

    if (this.contadorPedidoEmitidos == this.contadorPedido) {
      localStorage.setItem('pedidosP', 'esperandoComida');
      this.mesaServicio.actualizarMesaEmpleado(this.mesa, 'esperandoComida');
    }
    else {
      localStorage.setItem('pedidosP', 'pedidosPendiente' + (this.contadorPedido - this.contadorPedidoEmitidos));
      this.mesaServicio.actualizarMesaEmpleado(this.mesa, 'pedidosPendiente' + (this.contadorPedido - this.contadorPedidoEmitidos));
    }

  }



  contarEntregado() {

    let contadorEntregado = 0;
    let contadorPedido = 0;

    this.pedido.forEach(element => {
      contadorPedido++;
      if (element.estado == "entregado") {
        contadorEntregado++;
      }

    });

    if (contadorEntregado == this.mesa.pedidos.length) {
      localStorage.setItem('pedidosP', 'comiendo');
      this.mesaServicio.actualizarMesaEmpleado(this.mesa, 'comiendo');

    }


  }




}
