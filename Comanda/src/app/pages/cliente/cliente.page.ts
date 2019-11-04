import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Router } from '@angular/router';

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
  esperandoConfirmacion:boolean;


  constructor(
    private spinner: SpinnerService,  private router: Router,
    private qr: BarcodeScanner,
    private archivos: ArchivosService,
    private mesasServ : MesasService)
     {
    this.title = "Bienvenido Cliente: ";
  
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.botonera = true;
    this.menu = false;
    this.confirmar = false;

  }


  ingresarPedido() {
    this.menu = true;
    this.botonera = false;
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

  consultarPedidos()
  {
    this.router.navigate(['/detalle-mesa']);
  }




}
