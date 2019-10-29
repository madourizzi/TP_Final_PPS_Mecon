import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user';
import { SpinnerService } from './spinner.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<any>;
  usuarios: Observable<any[]>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private spinner: SpinnerService,
    private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('logout', 'assets/sounds/login.mp3').catch(error => { });

    this.usersCollection=db.collection<User>('users');
    this.usuarios = this.usersCollection.snapshotChanges().pipe(map(
      actions => actions.map(a=> {
        const data = a.payload.doc.data()as User;
        const id = a.payload.doc.id;
        return {id, data};
      })
    ));
  }
/**
 * 
 * @param email 
 * @param password 
 */
  login(email: string, password: string) {
    this.spinner.show();
    console.log(email + ' ' + password);
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
 
/**
 * 
 */
  logout() {
    this.angularFireAuth.auth.signOut()
      .then(res => {
        this.nativeAudio.play("logout").catch(error => { });
        this.router.navigate(['/login']);
      });
  }
/**
 * 
 */
  getCurrentUserId(): string {
    return this.angularFireAuth.auth.currentUser ? this.angularFireAuth.auth.currentUser.uid : null;
  }

  /**
   * 
   */
  getCurrentUserMail(): string {
    return this.angularFireAuth.auth.currentUser.email;
  }

  
  enviarUsuario(nuevoUsuario: User) {
    return this.db.collection('users').add(JSON.parse(JSON.stringify(nuevoUsuario)));

  }

  traerTodosUsuarios() {
    return this.db.collection('users').snapshotChanges();
  }
  
  traerUnUsuarios(uid) {
    return this.db.collection('users').doc(uid).valueChanges();
  }
  
  

  traerTodos(tipo) {
    return this.db.collection(tipo).snapshotChanges();
  }
  
  updateUser(user: User){
    return this.usersCollection.doc(user.uid).update(user);
}


  async onRegister(user: User) {
    var contenido = document.getElementById('contenido');
    try {
      this.nativeAudio.play("txt-alert");
      return await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error on Register: ', error);
      if (error.code == "auth/invalid-email") {
        contenido.innerHTML = `
        <div class="container mt-5" >
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <h4>El email <strong>${user.email}</strong> que acaba de ingresar es erroneo .</h4><br>
        <strong>El email debe ser del tipo "ejemplo@email.com" .</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      </div>
        `;
      } else if (error.code == "auth/weak-password") {
        contenido.innerHTML = `
        <div class="container mt-5">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <h4>El password debe tener al menos 6 caracteres.</h4> <br><strong>Reingrese una clave válida</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      </div>
        `;
      }
      else {
        contenido.innerHTML = `
        <div class="container mt-5">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <h4>ERROR: debe ingresar email y contraseña válidos.</h4>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      </div>
        `;
      }


    }
  }



}
