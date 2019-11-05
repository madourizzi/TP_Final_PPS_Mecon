import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private userServ: UsersService
  ) { }


  async getToken() {

    let token;
  
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    } 
  
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    } 
    
    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    let usuario;
    setTimeout(() => {
      usuario = this.userServ.traerUsuarioActual();
      console.log('usuario actual en fcm', usuario);
    }, 1400);
    
    
    if (!token) return;
  
    const devicesRef = this.afs.collection('dispositivos')
  
    const docData = { 
      token,
      id: usuario.id,
      perfil: usuario.perfil,
      mail: usuario.mail
    }
    
  
    return devicesRef.doc(token).set(docData)
}

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
}
