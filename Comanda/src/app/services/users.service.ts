import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AlertController } from '@ionic/angular';
import { showAlert } from '../../environments/environment';
import { MesasService } from './mesas.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usuariosFirebase: AngularFirestoreCollection<any>;
  public usuariosObservable: Observable<any>;

  private listaEsperaFirebase: AngularFirestoreCollection<string>;
  private listaEsperaObservable: Observable<string[]>;


  dbRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, public alertCtrl: AlertController, public mesaService: MesasService) {
    this.dbRef = this.db.collection("users");
  }

  saveUsuario(usuario: User) {
    let id = this.db.createId();
    usuario.uid = id;
    console.info("this.dbRef", this.dbRef)
    return this.dbRef.doc(id).set(usuario);
  }

  TraerUsuarios() {
    this.usuariosFirebase = this.db.collection<User>("users", ref => ref.orderBy('email', 'asc'));
    this.usuariosObservable = this.usuariosFirebase.valueChanges();
    return this.usuariosObservable;
  }

  GuardarUsuario(usuario) {

    let id = this.db.createId();
    usuario.uid = id;

    this.db.collection<any>("users").doc(id).set(usuario).then((data) => {
      console.log(data);
    }).catch((data) => {
      console.log(data);
    })

  }
  /////////////////////////////////

  cargarUsuario(usuarioAGuardarJSON: any) {

    let id = this.db.createId();
    usuarioAGuardarJSON.id = id;
    return this.db.collection<User>("users").doc(id).set(usuarioAGuardarJSON);
  }

  validarUsuarioExiste(usuarios: User[], email: string) {
    if (usuarios.filter(function (user) {
      return user.email === email
    }).length >= 1) {
      //
      showAlert(this.alertCtrl, "Error", "Ya existe un usuario con ese email en el sistema");
      return true;
    }
    return false;
  }

  traerListaDeEspera() {
    this.listaEsperaFirebase = this.db.collection<any>("listaEspera", ref => ref.orderBy('fecha', 'asc'));
    this.listaEsperaObservable = this.listaEsperaFirebase.valueChanges();
    return this.listaEsperaObservable;
  }

  cargarRegistroListaDeEspera(registroAGuardarJSON: any) {
    return this.db.collection<any>("listaEspera").add(registroAGuardarJSON);
  }

  EliminarUsuario(id) {
    return this.db.collection("SP_usuarios").doc(id).delete();
  }

  cargarUsuarioAnonimo(usuarioAGuardarJSON: any, id: string) {
    usuarioAGuardarJSON.id = id;
    return this.db.collection<User>("SP_usuarios").doc(id).set(usuarioAGuardarJSON);
  }

  RelacionUsuarioMesa(){
    let usuario = JSON.parse(sessionStorage.getItem('usuario')); 
    
    //console.log(usuario);

    let ocupaMesa:boolean = false;
      
    this.mesaService.mesas.forEach( mesa => {      
        
        if(mesa.usuario !== undefined && mesa.usuario !== null){
          if(mesa.usuario.uid == usuario.uid){              
            ocupaMesa = true;         
            sessionStorage.setItem("mesaOcupada", JSON.stringify(mesa));  
          }
        }          
      });          


    return ocupaMesa;

  }

}

