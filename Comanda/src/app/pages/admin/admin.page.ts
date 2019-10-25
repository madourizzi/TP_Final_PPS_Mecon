import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

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

  constructor( private spinner: SpinnerService) {
    this.adminPerfilUser=false;
    this.title=" administrador";
  }
  
  ngOnInit() {
    setTimeout(()=>    this.spinner.hide(), 1000  );
    this.cargarProducto=true;
    this.botonera=false;
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



}
