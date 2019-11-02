import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  altaMesa;
  listaMesa;
  botonera;
  title;
  productoElegido;

  constructor(private spinner: SpinnerService,
    private qr: BarcodeScanner,
    private archivos: ArchivosService) {
    this.title = " administrador";
  }


  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.listaMesa = false;
    this.botonera = true;
    this.altaMesa = false;
    
  }

  verListaMesa() {
    this.listaMesa = true;
    this.botonera = false;
    this.altaMesa = false;
    
  }
  verAltaMesa() {
    this.listaMesa = false;
    this.botonera = false;
    this.altaMesa = true;
    localStorage.setItem("productoEstado", "true");
    
  }

  volver()
  {
    this.listaMesa = false;
    this.botonera = true;
    this.altaMesa = false;
  }

  editarUsu($event)
  {
    this.listaMesa = false;
    this.botonera = false;
    this.altaMesa = true;
    this.productoElegido= $event;    
  
    

  }

  





}
