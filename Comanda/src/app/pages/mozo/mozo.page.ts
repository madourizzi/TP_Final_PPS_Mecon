import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
//import { MesasService } from 'src/app/services/mesas.service';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {
  usuarioActual: User;

  constructor(private usuarios: UsersService,
    private spinner: SpinnerService,
    public afs: AngularFirestore,
    private alertController: AlertController,
    public fcm: FirebaseX,
    public platform: Platform
  ) {

  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    setTimeout(() => {
      this.usuarioActual = this.usuarios.traerUsuarioActual();
      console.log("el usuario actual en Pagina Mozo es: ", this.usuarioActual);
      this.getTokenControl();

    }, 1000);
    this.fcm.onMessageReceived().subscribe(async data => {
      console.log(`FCM message: ${data}`);
      const alert = await this.alertController.create({
        header: 'Aviso.',
        message: `FCM message: ${data.body}`,

        buttons: ['OK']
      });
      await alert.present();

  
    });
  }




  async getTokenControl() {

    let token;
    if (this.platform.is('android')) {

      token = await this.fcm.getToken()
        .then(async token => {
          await this.saveTokenToFirestore(token);
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



}





