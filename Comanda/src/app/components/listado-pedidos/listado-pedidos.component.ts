import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
})
export class ListadoPedidosComponent{

  filtroDelivery: boolean;
  listaProductos: Array<Producto>;
  pedido;

  @Input() pedidos: Array<Pedido>;

  constructor(
    private pedidoService: PedidosService
  ) {

    this.filtroDelivery = false;

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (usuario.tipo == 'delivery') {
      this.filtroDelivery = true;
    }

  }

  //FUNCIONES DELIVERY

  RetirarEntrega(pedido: Pedido) {


    this.pedidoService.actualizarUnPedido(pedido.id).update({

      'estado': 'en_camino'

    }).then(() => {

      console.log('Documento editado exitósamente');

    }).catch(err => {
      console.log('Falló al intentar modificar el documento', err);

    });

  }

  Entregar(pedido: Pedido) {

    this.pedidoService.actualizarUnPedido(pedido.id).update({

      'estado': 'entregado'

    }).then(() => {

      console.log('Documento editado exitósamente');

    }).catch(err => {
      console.log('Falló al intentar modificar el documento', err);

    });

  }

  buscarCosto(nombre) {
    let prod;
    prod = this.listaProductos.filter((p => {
      return p.nombre == nombre;
    }));

    return prod[0].precio;
  }

  async Cobrar(pedido: Pedido) {
    let total = pedido.costo;
    let propina;

    if (pedido.descuento_10) {
      total = total - (total * 10) / 100;
    }


    if (pedido.propina) {
      //propina = (total *pedido.propina)/100;
      total += pedido.propina;
    }

    if (pedido.descuento_bebida) {
      let bandera = true;
      pedido.productos.forEach((prod: Producto) => {

        if (prod.tipo == "bebida" && bandera) {
          let precioProducto = this.buscarCosto(prod.nombre)
          console.log(precioProducto);
          total -= precioProducto;
          bandera = false
        }
      })
    }

    if (pedido.descuento_postre) {
      let bandera = true;
      pedido.productos.forEach((prod: Producto) => {

        if (prod.tipo == "postre" && bandera) {
          let precioProducto = this.buscarCosto(prod.nombre)
          total -= precioProducto;
          bandera = false
        }
      })
    }

    total = Math.floor(total * 100) / 100;


    this.pedidoService.actualizarUnPedido(pedido.id).update({

      'estado': 'pagado'

    }).then(() => {

      console.log('Documento editado exitósamente');

    }).catch(err => {

      console.log('Falló al intentar modificar el documento', err);

    });

  }
}

