import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Jugador } from '../clases/jugador';
import { map, take, delay, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  usuarioActual: User = new User();
  jugadorActual: Jugador = new Jugador();
  listado = [];

  constructor(public afs: AngularFirestore,
    private usuarios: UsersService, private router: Router) {


    setTimeout(() => {
      this.usuarioActual = this.usuarios.traerUsuarioActual();
      console.log("actual en cliente en juego : ", this.usuarioActual);
      this.iniciarJuegos();
    }, 50);
  }


  iniciarJuegos() {
    this.traerDatosJugador().subscribe((jugador) => {
      console.log("el jugado: ", jugador);
      if (jugador != undefined) {
        this.jugadorActual = jugador[0];
        console.log("el jugado actual en cliente jugando: ", this.jugadorActual);
      }
      else {
        this.jugadorActual.uid = this.usuarios.usuarioActual.uid;
        console.log("el usuario actual en cliente jugando: ", this.usuarioActual.uid);
      }

    });


  }


  registrar() {
    let ref = this.afs.collection('users').doc(this.usuarioActual.uid).collection('descuentos').doc('juego').set(
      {
        jugadas: this.jugadorActual.jugadas,
        descuento: this.jugadorActual.descuento
      }
    );
  }

  traerDatosJugador() {
    let datos = this.afs.collection('users').doc(this.usuarioActual.uid).collection('descuentos').snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject2)));
    return datos
  }

  //aca descarga el descuento y vuelve a cero las jugadas y descuento
  aplicarDescuento() {
    let descuentoAplicado = this.jugadorActual.descuento;
    let ref = this.afs.collection('users').doc(this.usuarioActual.uid).collection('descuentos').doc('juego').set(
      {
        jugadas: 0,
        descuento: 0
      }
    );
    this.jugadorActual.descuento = 0;
    this.jugadorActual.jugadas = 0;
    console.log("descuentoAplicado", descuentoAplicado);
    return descuentoAplicado;
  }



  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.uid = _.payload.doc.id;
    return object;
  }

  documentToDomainObject2 = _ => {
    const object = _.payload.doc.data() as Jugador
    object.uid = _.payload.doc.id;
    return object;
  }


}
