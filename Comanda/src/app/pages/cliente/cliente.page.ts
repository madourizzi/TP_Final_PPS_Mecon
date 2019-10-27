import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  title: string;
  botonera;
  menu: boolean;
  pedido: Array<any>;
  confirmar: boolean;
  pedirMesa: boolean;


  constructor(
    private spinner: SpinnerService,
    private qr: BarcodeScanner,
    private archivos: ArchivosService) {
    this.title = "Bienvenido Cliente: ";
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.botonera = false;
    this.menu = false;
    this.confirmar = false;
    this.pedirMesa = true;
  }

  pedirMesaQr() {
    this.botonera = true;
    this.menu = false;
    this.confirmar = false;
    this.pedirMesa = false;
    setTimeout(() => console.log("algo"), 1000);

  }




  ingresarPedido() {
    this.menu = true;
    this.botonera = false;
  }



  leerQr() {
    console.log("qr" + this.qr.scan());

    /* ionic cordova plugin add phonegap-plugin-barcodescanner
   npm install @ionic-native/barcode-scanner */
  }

  volver($event) {
    this.menu = false;
    this.botonera = true;
  }

  recibirPedido($event) {
    this.pedido = $event;
    console.log("emit cliente pedido", this.pedido);
    this.confirmar = true;
    this.menu = false;
    this.botonera = false;
  }




}
