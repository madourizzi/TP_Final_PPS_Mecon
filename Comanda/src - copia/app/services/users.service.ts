import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usuariosFirebase: AngularFirestoreCollection<any>;
  public usuariosObservable: Observable<any>;


  dbRef: AngularFirestoreCollection<any>;

  constructor(private objFirebase: AngularFirestore) {
    this.dbRef = this.objFirebase.collection("users");
  }

  saveUsuario(usuario: User){
    let id = this.objFirebase.createId();
    usuario.uid = id;
    console.info("this.dbRef", this.dbRef)
    return this.dbRef.doc(id).set(usuario);
  }

  TraerUsuarios() {
    this.usuariosFirebase = this.objFirebase.collection<User>("users", ref => ref.orderBy('email', 'asc'));
    this.usuariosObservable = this.usuariosFirebase.valueChanges();
    return this.usuariosObservable;
  }

  GuardarUsuario(usuario) {

    let id = this.objFirebase.createId();
    usuario.uid = id;

    this.objFirebase.collection<any>("users").doc(id).set(usuario).then((data) => {
      console.log(data);
    }).catch((data) => {
      console.log(data);
    })

  }
}
