import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { MesasService } from 'src/app/services/mesas.service';
import { Mesa } from 'src/app/models/mesa';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
})
export class ListadoPedidosComponent {


  pedidos: Array<any> = Array<any>();
  productoElegido;
  @Output() pedidoEmit: EventEmitter<any>;

  detalleMesa = false;

  tipoOrden = "tipo";
  orden = "asc";

  ////modal
  modificar;
  tiempo;
  modal;
  pedidoActual;
  perfil;
  listaProductos;
  noHayPedido;
  constructor(
    private pedidoService: PedidosService, private mesaService: MesasService
  ) {

    this.pedidoEmit = new EventEmitter();
    this.modal = false;
    this.perfil = localStorage.getItem('perfil');
    this.noHayPedido = false;

  }


  ngOnInit() {
    this.pedidoService.traerTodosPedidos().subscribe((actions => {
      this.pedidos = [];
      actions.forEach((e) => {
        let data = e.payload.doc.data() as Pedido; 
        if (data.area == this.perfil || this.perfil == "admin") {
          if (data.estado != "terminado") {
            this.pedidos.push(data);
          }
        }

      });
      this.detalleMesa = true;

      if (this.pedidos.length == 0) {
        this.noHayPedido = true;
      }

    }));



  }

  tomarPedido(pedido, tiempo) {
    this.pedidoActual = pedido;
    this.tiempo = tiempo;
    this.prepararPedido('enPreparacion');
  }



  prepararPedido(estado) {
    this.pedidoActual.estado = estado;
    this.pedidoActual.tiempo_espera = this.tiempo;
    this.pedidoService.actualizarUnPedido(this.pedidoActual, estado);
  }

  terminarPedido(estado, pedido) {
    pedido.estado = estado;
    pedido.tiempo_espera = -1;
    this.pedidoService.actualizarUnPedido(pedido, estado);
    let mesa;
    let uno = false;
    this.mesaService
      .traerUnaMesaUID(pedido.mesa)
      .subscribe((e) => {
        mesa = e.payload.data() as Mesa;
        if (estado == "terminado" && !uno) {
          this.mesaService.actualizarMesaEmpleado(mesa, "pedidoListo");
          uno = true;
        }
      });





  }





















  //FUNCIONES DELIVERY
  /* 
    RetirarEntrega(pedido: Pedido) {
  
  
      this.pedidoService.actualizarUnPedido(pedido.uid).update({
  
        'estado': 'en_camino'
  
      }).then(() => {
  
        console.log('Documento editado exitósamente');
  
      }).catch(err => {
        console.log('Falló al intentar modificar el documento', err);
  
      });
  
    } */

  /*  Entregar(pedido: Pedido) {
 
     this.pedidoService.actualizarUnPedido(pedido.uid).update({
 
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
 
 
     this.pedidoService.actualizarUnPedido(pedido.uid).update({
 
       'estado': 'pagado'
 
     }).then(() => {
 
       console.log('Documento editado exitósamente');
 
     }).catch(err => {
 
       console.log('Falló al intesntar modificar el documento', err);
 
     });
 
   } */
}

