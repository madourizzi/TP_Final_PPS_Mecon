import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  adminPerfilUser;
  editarUsuario;
  usuarioElegido:User;
  title: string;
  cargarProducto;
  botonera;


  constructor(private spinner: SpinnerService,
    private qr: BarcodeScanner,
    private archivos: ArchivosService) {
    this.title = "ABM empleados";
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.adminPerfilUser = false;
    this.botonera = true;
    this.editarUsuario = false;

  }

  editarUsu($event)
  {
    console.log("$evbent", $event);    
    this.adminPerfilUser =false;
    this.editarUsuario = true;
    this.botonera = false;
    this.usuarioElegido= $event;    

  }


  cambiarPerfilUsu()
  {   
    this.adminPerfilUser =true;
    this.editarUsuario =false;
    this.botonera = false;
    this.usuarioElegido=null;   
  }

  nuevoUsuario()
  {   
    this.adminPerfilUser =false;
    this.editarUsuario =true;
    this.botonera = false;
    this.usuarioElegido=null;   
  }

 volver()
 {
  this.adminPerfilUser = false;
  this.botonera = true;
  this.editarUsuario = false;
 }

}
