import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { CamaraStorageService } from 'src/app/services/camara-storage.service';
import { ModalController, AlertController } from '@ionic/angular';
import { round, spin, uploadImage, wait, showAlert } from 'src/environments/environment';

@Component({
  selector: 'app-producto-alta',
  templateUrl: './producto-alta.page.html',
  styleUrls: ['./producto-alta.page.scss'],
})
export class ProductoAltaPage {

  producto: Producto;
  photoData: Array<any>;

  foto1Disabled = false;
  foto2Disabled = false;
  foto3Disabled = false;

  productos: Producto[];

  perfilActual: string;

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private productoService: ProductosService,
    private cameraService: CamaraStorageService,
    private qrService: LectorQrService) {
    this.producto = new Producto();
    this.photoData = new Array<any>();
    this.perfilActual = JSON.parse(sessionStorage.getItem("usuario")).tipo;
  }

  ionViewWillEnter() {
    this.productoService.traerProductos().subscribe(arr => {
      console.info("Conexión correcta con Firebase: productos", arr);
      this.productos = arr;
    });;
  }

  cargar() {

    if (this.validarCampos()) {

      let productoAGuardar = new Producto();
      productoAGuardar.nombre = this.producto.nombre;
      productoAGuardar.descripcion = this.producto.descripcion;
      productoAGuardar.tiempo = round(this.producto.tiempo, 0);
      productoAGuardar.precio = round(this.producto.precio, 2);
      productoAGuardar.tipo = this.producto.tipo;
      if (this.producto.foto1 === "Cargada") productoAGuardar.setFoto1();
      if (this.producto.foto2 === "Cargada") productoAGuardar.setFoto2();
      if (this.producto.foto3 === "Cargada") productoAGuardar.setFoto3();

      spin(this.modalCtrl, true);

      this.productoService.cargarProducto(productoAGuardar.dameJSON()).then(() => {
        if (this.photoData.length !== 0) {
          this.photoData.forEach((photo: any) => {
            if (photo.foto === "foto1") {
              uploadImage(photo.imageData, productoAGuardar.foto1);
            }
            if (photo.foto === "foto2") {
              uploadImage(photo.imageData, productoAGuardar.foto2);
            }
            if (photo.foto === "foto3") {
              uploadImage(photo.imageData, productoAGuardar.foto3);
            }
            wait(5000);
          });
        };
        spin(this.modalCtrl, false);
        showAlert(this.alertCtrl, "Exito", "Producto dado de alta exitosamente");

      })
        .catch(error => {
          console.log(error);
          spin(this.modalCtrl, false);
        });
    }
  }

  cargarConQR() {
    this.qrService.readQR().then(barcodeData => {
      try {
        this.producto = JSON.parse(barcodeData.text);
      } catch (err) {
        showAlert(this.alertCtrl, "Error", "QR invalido");
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  sacarFoto(foto: string) {
    this.cameraService.takePhoto().then((imageData) => {
      this.photoData.push({
        "foto": foto,
        "imageData": imageData
      });
      if (foto === "foto1") { this.producto.foto1 = "Cargada"; this.foto1Disabled = true; }
      if (foto === "foto2") { this.producto.foto2 = "Cargada"; this.foto2Disabled = true; }
      if (foto === "foto3") { this.producto.foto3 = "Cargada"; this.foto3Disabled = true; }

    }, (err) => {
      showAlert(this.alertCtrl, "Error", err);
    }).catch((erro) => {
      showAlert(this.alertCtrl, "Error", erro);
    });
  }

  validarCampos() {
    //Validacion de form
    let mensaje: string = "Debe completar los campos:";
    if (this.producto.nombre === undefined || this.producto.nombre === "") mensaje = mensaje + " nombre";
    if (this.producto.descripcion === undefined || this.producto.descripcion === "") mensaje = mensaje + " descripcion";
    if (this.producto.tiempo === undefined) mensaje = mensaje + " tiempo";
    if (this.producto.precio === undefined) mensaje = mensaje + " precio";
    if (this.producto.tipo === undefined || this.producto.tipo === "") mensaje = mensaje + " tipo";
    if (mensaje !== "Debe completar los campos:") {
      showAlert(this.alertCtrl, "Error", mensaje);
      return false;
    }
    //Validacion de nombre existente
    let parentScope: any = this;
    let productosFiltrados: any = this.productos.filter(function (el) {
      return el.nombre === parentScope.producto.nombre;
    });

    if (productosFiltrados.length === 1) {
      showAlert(this.alertCtrl, "Error", "Un producto con ese nombre ya existe");
      return false;
    }

    return true;
  }

}
