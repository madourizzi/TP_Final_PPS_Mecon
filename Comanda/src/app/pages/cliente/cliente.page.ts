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
import { ToastService } from 'src/app/services/toast.service';
import { JuegosService } from 'src/app/juegos/services/juegos.service';



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

  cuenta;

  constructor(
    private spinner: SpinnerService, private router: Router,
    private qr: BarcodeScanner,
    private archivos: ArchivosService,
    public afs: AngularFirestore,
    private usuarios: UsersService,
    public mesasServ: MesasService,
    private alertController: AlertController,
    public fcm: FirebaseX,
    public platform: Platform,
    private toast: ToastService,
    private toastCtrl: ToastController,
    public juegosServicio: JuegosService) {

    this.title = "Bienvenido Cliente: ";
    this.usuarioActual = new User();
    this.cuenta = false;

  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.botonera = true;
    this.menu = false;
    this.confirmar = false;

    setTimeout(() => {
      this.usuarioActual = this.usuarios.traerUsuarioActual();
      console.log("el usuario actual en cliente es: ", this.usuarioActual);
     
      /*     if (!this.usuarioActual.registrado) {
            this.registroClienteAlertConfirm();
          } */
      this.getTokenControl();
      this.mesasServ.traerMesaPorUsuarioMail(this.usuarioActual.email);

    }, 1500);

  }

  async getTokenControl() {

    let token;
    if (this.platform.is('android')) {

      token = await this.fcm.getToken()
        .then(async token => {
          console.error('se obtuvo el token perren', token)
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

  reservarMesa() {
    this.router.navigate(['/reserva']);
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
    this.cuenta = false;
  }


  volver($event) {
    this.menu = false;
    this.botonera = true;
    this.cuenta = false;
    this.confirmar=false;
  }

  jugar() {
    console.log(" aca va el juego");
    setTimeout(() => {
      this.juegosServicio.iniciarJuegos();
    }, 1500);
    console.log(" ok el juego");
    this.router.navigate(['/Juegos/MemoriaVisual']);

  }

  cerrarMesa() {
    console.log("'cuentaPedida'");
    this.mesasServ.actualizarMesaEmpleado(this.mesasServ.mesaActual, 'cuentaPedida');
  }

  verCuenta() {
    
    if (!this.cuenta) {
      this.cuenta = true;
      this.menu = false;
      this.botonera = true;
      this.confirmar = false;

    } else {
      this.cuenta = false;
      this.menu = false;
      this.botonera = true;
      this.confirmar = false;

    }


  }



  recibirPedido($event) {
    this.pedido = $event;
    console.log("emit cliente pedido", this.pedido);
    this.confirmar = true;
    this.menu = false;
    this.botonera = false;
    this.cuenta = false;
  }

  consultarPedidos() {
    this.router.navigate(['/detalle-mesa']);
  }

  pedirMesaQR() {
    this.spinner.show();
 //para testing
  this.mesasServ.leerQrPedirMesa();    
   
  }

  async hacerEncuesta() {
    await this.toast.confirmationToastEncuesta("Le agradeceremos que llene la siguiente encuesta anónima");
    this.router.navigate(['/encuesta-cliente']);
  }


  consultarPedidosAnonimo() {
    this.mesasServ.EstadoPedido().then(() => {
      if (this.mesasServ.mesaActual) {
        this.router.navigate(['/detalle-mesa']);
      }
      else {
        console.log("no hay mesa actual, tiene q ingresar qr");

      }

    })
  }



}
