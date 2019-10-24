import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { SpinnerService } from './spinner.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,  private router: Router,
    private db: AngularFirestore, private spinner: SpinnerService, private nativeAudio: NativeAudio) {
      this.nativeAudio.preloadSimple('logout', 'assets/sounds/login.mp3').catch(error => { });
     }

  login(email: string, password: string) {
    this.spinner.show();
    console.log(email + ' ' + password);
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.nativeAudio.play("logout").catch(error => { });
      this.spinner.hide();
      console.log(this.angularFireAuth.auth.currentUser);
      return res;
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut()
    .then( res => {
      this.nativeAudio.play("logout").catch(error => { });
      this.router.navigate(['/login']);
    });
  }

  getCurrentUserId(): string {
    return this.angularFireAuth.auth.currentUser ? this.angularFireAuth.auth.currentUser.uid : null;
  }

  getCurrentUserMail(): string {
    return this.angularFireAuth.auth.currentUser.email;
  }
}
