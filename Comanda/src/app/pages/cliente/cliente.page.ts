import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { AlertController } from '@ionic/angular';

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
  usuarioActual: User;

  constructor(
    private spinner: SpinnerService,  private router: Router,
    private qr: BarcodeScanner,
    private archivos: ArchivosService,
    private usuarios: UsersService,
    private mesasServ : MesasService,
    private alertController:AlertController)
     {
    this.title = "Bienvenido Cliente: ";

    

    
  
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.botonera = true;
    this.menu = false;
    this.confirmar = false;
    setTimeout(() => {
      this.usuarioActual = this.usuarios.traerUsuarioActual();
      console.log("el usuario actual es: ", this.usuarioActual);

        if(this.usuarioActual.registrado==false){
          this.registroClienteAlertConfirm();
        }
      
    }, 1000);
      
    
  }


  async registroClienteAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Registrese como cliente!',
    message: 'Para poder obtener los privilegios de <strong>cliente VIP</strong>!!!',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');//enviar a la pagina de registro definitivo de usuario
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          this.router.navigate(['/cliente-registro']);  
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
  let result = await alert.onDidDismiss();
  console.log(result);
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

  pedirMesaQR()
  {
    this.router.navigate(['/pedir-mesa-qr']);
  }


  consultarPedidosAnonimo()
  {
    //lanza qr y da detalle directo de cualquier mesa
    this.router.navigate(['/detalle-mesa']);
  }



}
