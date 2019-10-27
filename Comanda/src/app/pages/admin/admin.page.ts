import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminPerfilUser;

  adminPerfilUser2;

  title: string;
  cargarProducto;
  botonera;

  constructor(private spinner: SpinnerService,
    private qr: BarcodeScanner,
    private archivos: ArchivosService) {
    this.adminPerfilUser = false;

    this.title = " administrador";
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.botonera = true;
  }


  cambiarPerfilUsuario() {
    this.adminPerfilUser = true;
    this.adminPerfilUser2 = true;
    this.botonera = false;
    this.cargarProducto = false;
  }


  cargarProductos() {
    this.cargarProducto = true;
    this.adminPerfilUser = false;

    this.botonera = false;

  }


  leerQr() {
    console.log("qr" + this.qr.scan());
    /* ionic cordova plugin add phonegap-plugin-barcodescanner
   npm install @ionic-native/barcode-scanner */
  }

  camara() {
    
    this.archivos.camara('producto');
    /* ionic cordova plugin add cordova-plugin-file
    npm install @ionic-native/file */

  }

  volver($event)
  {
    this.adminPerfilUser =false;
    this.adminPerfilUser2 = false;
    this.botonera = true;
    this.cargarProducto = false;

  }



}
