import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminPerfilUser;
  editarUsuario;
  usuarioElegido:User;
  title: string;
  cargarProducto;
  botonera;
  altaMesa;

  constructor(
    private spinner: SpinnerService,    
    private router: Router, 
    private qr: BarcodeScanner,
    private archivos: ArchivosService) {
    this.title = " administrador";
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.adminPerfilUser = false;
    this.cargarProducto = false;
    this.botonera = true;
    this.editarUsuario = false;
    this.altaMesa=false;
  }


  mesas() {
    this.router.navigate(['/mesa']);
  }


 productos() {
    this.router.navigate(['/productos']);
  }


  empleados() {
    this.router.navigate(['/empleados']);
  }

  stats() {    
    this.router.navigate(['/stats']);
  }

  volver($event)
  {
    this.cargarProducto = false;
    this.adminPerfilUser = false;
    this.botonera = true;
    this.editarUsuario = false;
    this.altaMesa=false;

  }



}
