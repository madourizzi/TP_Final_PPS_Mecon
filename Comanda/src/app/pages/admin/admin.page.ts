import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminPerfilUser;
  title: string;
  cargarProducto;
  botonera;

  constructor( private spinner: SpinnerService, private qr: BarcodeScanner) {
    this.adminPerfilUser=false;
    this.title=" administrador";
  }
  
  ngOnInit() {
    setTimeout(()=>    this.spinner.hide(), 1000  );
    this.cargarProducto=false;
    this.botonera=true;
  }


  cambiarPerfilUsuario()
  {
    this.adminPerfilUser= true;
    this.botonera=false;
    this.cargarProducto= false;
  }


  cargarProductos()
  {
    this.cargarProducto= true;
    this.adminPerfilUser= false;
    this.botonera=false;

  }

  leerQr()
  {
 console.log("qr"+  this.qr.scan());


  }



}
