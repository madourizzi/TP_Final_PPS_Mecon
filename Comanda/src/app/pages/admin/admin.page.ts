import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminPerfilUser;
  editarUsuario;
  usuarioElegido:User;
  title: string;
  cargarProducto;
  botonera;
  usuarioActual: User;

  altaMesa;

  constructor(
    private spinner: SpinnerService,    
    private router: Router, 
    private qr: BarcodeScanner,
    public fcm: FirebaseX,
    public platform: Platform,
    public afs: AngularFirestore,
    private archivos: ArchivosService,
    private usuarios: UsersService) {
    this.title = " administrador";
  }

  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.adminPerfilUser = false;
    this.cargarProducto = false;
    this.botonera = true;
    this.editarUsuario = false;
    this.altaMesa=false;
    setTimeout(() => {
      this.usuarioActual = this.usuarios.traerUsuarioActual();
      console.log("el usuario actual en ADMIN es: ", this.usuarioActual);

      this.getTokenControl();

    }, 1000);
  }

  async getTokenControl() {

    let token;
    if (this.platform.is('android')) {

      token = await this.fcm.getToken()
        .then(async token => {
          console.log(`The token is ${token}`);
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


  mesas() {
    this.router.navigate(['/mesa']);
  }


 productos() {
    this.router.navigate(['/productos']);
  }


  empleados() {
    this.router.navigate(['/empleados']);
  }

  stats() {    
    this.router.navigate(['/stats']);
  }

  reservas() {    
    this.router.navigate(['/reservas']);
  }

  volver($event)
  {
    this.cargarProducto = false;
    this.adminPerfilUser = false;
    this.botonera = true;
    this.editarUsuario = false;
    this.altaMesa=false;
  }



}
