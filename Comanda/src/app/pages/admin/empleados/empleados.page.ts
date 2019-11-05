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
  autorizarCliente;


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
    this.autorizarCliente=false;

  }

  editarUsu($event)
  {
    console.log("$evbent", $event);    
    this.adminPerfilUser =false;
    this.editarUsuario = true;
    this.botonera = false;
    this.usuarioElegido= $event;   
    this.autorizarCliente=false; 

  }


  cambiarPerfilUsu()
  {   
    this.adminPerfilUser =true;
    this.editarUsuario =false;
    this.botonera = false;
    this.usuarioElegido=null; 
    this.autorizarCliente=false;  
  }

  nuevoUsuario()
  {   
    this.adminPerfilUser =false;
    this.editarUsuario =true;
    this.botonera = false;
    this.usuarioElegido=null;  
    this.autorizarCliente=false; 
  }

  cliente()
  {   
    this.adminPerfilUser =false;
    this.editarUsuario =false;
    this.botonera = false;
    this.autorizarCliente=true;
  }

 volver()
 {
  this.adminPerfilUser = false;
  this.botonera = true;
  this.editarUsuario = false;
 }

}
