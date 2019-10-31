import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore} from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public http: HttpClient,
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
    ) {
    //console.log('Hello FcmProvider Provider');
  }

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
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    
    
    if (!token) return;
  
    const devicesRef = this.afs.collection('devices')
  
    const docData = { 
      token,
      id: usuario.id,
      perfil: usuario.perfil
    }
    
  
    return devicesRef.doc(token).set(docData)
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }
}
