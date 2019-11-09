import { Injectable } from '@angular/core';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public fcm: FirebaseX,
    public afs: AngularFirestore,
    private userServ: UsersService
  ) { }


 getToken() {

    let token;

    token = this.fcm.getToken()
      .then(token => console.log(`The token is ${token}`))
      .catch(error => console.error('Error getting token', error));
    this.saveTokenToFirestore(token);

    return this.saveTokenToFirestore(token)
  }

  saveTokenToFirestore(token) {
    let usuario;
    usuario = this.userServ.traerUsuarioActual();
    setTimeout(() => {
      console.log('usuario actual en fcm', usuario);
    }, 1000);

    if (!token) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      uid: usuario.uid,
      perfil: usuario.perfil
    }
    return devicesRef.doc(token).set(docData)
  }

  listenToNotifications() {
    return this.fcm.onMessageReceived().subscribe(
      data => console.log(`FCM message: ${data}`)
    );
  }
}
