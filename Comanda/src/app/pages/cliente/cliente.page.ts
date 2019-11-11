import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { MesasService } from 'src/app/services/mesas.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { AlertController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  title: string;
  botonera;
  menu: boolean;
  pedido: Pedido;
  confirmar: boolean;
  pedirMesa: boolean;
  esperandoConfirmacion: boolean;
  usuarioActual: User;

  constructor(
    private spinner: SpinnerService, private router: Router,
    private qr: BarcodeScanner,
    private archivos: ArchivosService,
    public afs: AngularFirestore,
    private usuarios: UsersService,
    private mesasServ: MesasService,
    private alertController: AlertController,
    public fcm: FirebaseX,
    public platform: Platform,
    private toastCtrl: ToastController) {
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
        if (!this.usuarioActual.registrado) {
        this.registroClienteAlertConfirm();
      }
      this.getTokenControl();
      this.mesasServ.traerMesaPorUsuarioMail(this.usuarioActual.email);
    }, 1500);
    


  }

  async getTokenControl() {

    let token;
    if (this.platform.is('android')) {

      token = await this.fcm.getToken()
        .then(async token => {
          const alert = await this.alertController.create({
            header: 'alert de token',
            message: "'This is the token.' + ${token}",

            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Ok',
                handler: (alertData) => { //takes the data 
                  console.log(alertData.name1);
                }
              }
            ]
          });
          await alert.present();
          console.log(`The token is ${token}`);
          this.saveTokenToFirestore(token);
        })

        .catch(error => console.error('Error getting token', error));
    }
  }

  saveTokenToFirestore(token) {
    let usuario;
    usuario = this.usuarioActual;

    if (!token) return;

    const devicesRef = this.afs.collection('devices');

    const docData = {
      token,
      uid: usuario.uid,
      perfil: usuario.perfil
    }
    return devicesRef.doc(token).set(docData)
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

  consultarPedidos() {   
    this.router.navigate(['/detalle-mesa']);
  }

  pedirMesaQR() {
    this.router.navigate(['/pedir-mesa-qr']);
  }


  consultarPedidosAnonimo() {
    this.mesasServ.EstadoPedido().then(()=>{
      if(this.mesasServ.mesaActual)
      {
        this.router.navigate(['/detalle-mesa']);
      }
      else{
      console.log("no hay mesa actual, tiene q ingresar qr");
      
      }

    })
  }



}
