import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { ToastController, ModalController, PopoverController, AlertController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { SPINNER_IMG, getImageURL } from 'src/environments/environment';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.page.html',
  styleUrls: ['./producto-lista.page.scss'],
})
export class ProductoListaPage {

  prodABuscar: string;
  botonHabilitado: boolean = true;

  pedido: Pedido;
  productos: Array<Producto>;
  productosFiltrados: Array<Producto>;

  propiedadesFotos: Array<string> = ["foto1", "foto2", "foto3"];
  detallesProductos: Array<any>;
  productosCargados: Array<any>;

  pedidoExistia: boolean = false;

  constructor(public toastController: ToastController,
    public modalController: ModalController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    public productoService: ProductosService,
    public pedidoService: PedidosService) {

    this.pedido = new Pedido();
    this.productos = new Array<Producto>();
    this.productosFiltrados = new Array<Producto>();
    this.detallesProductos = new Array<any>();
    this.productosCargados = new Array<any>();
    //this.pedido.cliente = navParams.get("cliente"); traer el cliente
    //this.pedido.tipo = navParams.get("tipo"); traer el tipo de pedido
    if (this.pedido.tipo === "restaurant") {
      //this.pedido.mesaId = navParams.get("mesa").id; //traer el id de mesa bindeado
      //this.pedido.mesa = navParams.get("mesa").numero; //traer el numero de mesa bindeado
    }
    if (this.pedido.tipo === "delivery") {
      this.pedido.mesaId = null;
      this.pedido.mesa = null;
    }
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario.tipo === "cliente" || usuario.perfil === "anonimo") {
      this.pedido.estado = "solicitado";
    } else if (usuario.tipo === "mozo") {
      this.pedido.estado = "pendiente";
    }
    this.inicializarProductos();
  }

  inicializarProductos() {
    this.productoService.traerProductos().subscribe(productos => {
      productos.forEach((producto, index) => {
        this.productosFiltrados.push(new Producto(producto.id, producto.nombre, producto.descripcion, producto.tiempo, producto.precio, producto.tipo));
        this.productos.push(new Producto(producto.id, producto.nombre, producto.descripcion, producto.tiempo, producto.precio, producto.tipo));
        this.detallesProductos[producto.nombre] = false;
        this.propiedadesFotos.forEach(propString => {
          if (producto[propString] !== "") {
            this.productosFiltrados[index][propString] = SPINNER_IMG;
            this.productos[index][propString] = SPINNER_IMG;
            getImageURL(producto[propString]).then(data => {
              this.productosFiltrados[index][propString] = data;
              this.productos[index][propString] = data;
            })
          }
        })
      });
    })
  }

  search() {
    this.productosFiltrados = this.productos.filter(producto => {
      return producto.nombre.toLowerCase().indexOf(this.prodABuscar.toLowerCase()) > -1;
    });
  }

  mostrarDetalles(nombre: string) {
    (this.detallesProductos[nombre]) ? this.detallesProductos[nombre] = false : this.detallesProductos[nombre] = true;
  }

}
