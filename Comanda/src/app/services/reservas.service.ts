import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Reserva } from '../models/reserva';
import { Mesa } from '../models/mesa';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private listaReservasFirebase: AngularFirestoreCollection<Reserva>;
  private listaReservasObservable: Observable<Reserva[]>;
  public reservas: Array<Reserva>
  url = "https://us-central1-lacomandapps.cloudfunctions.net/EstadoReserva"; //asignar una url con el estado de la reserva

  constructor(
    public http: HttpClient,
    private db: AngularFirestore,
    public toastCtrl: ToastController) {
    this.reservas = new Array<any>();   
  }

  TraerReservas() {

    this.listaReservasFirebase = this.db.collection<any>("reservas", ref => ref.orderBy('fecha', 'desc'));

    return this.listaReservasFirebase.snapshotChanges();


  }

  async GuardarReserva(reserva: Reserva) {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));

    //nuevaMesa.codigoQr = encodedData;
    var idReserva = this.db.createId();


    this.db.collection("reservas").doc(idReserva)
      .set({
        'id': idReserva,
        'fecha': reserva.fecha,
        'hora': reserva.hora,
        'cliente': usuario,
        'mesas': reserva.mesas,
        'estado': reserva.estado

      }).then(async res => {

        console.log(res);
        const toast = await this.toastCtrl.create({
          message: "Reservaste la mesa: " + reserva.mesas + " para el dia " + reserva.fecha + "a las " + reserva.hora,
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();

        // this.altaReservaForm.reset();

      }, err => console.log(err));
  }

  AutorizarReseva(reserva: Reserva) {
    reserva.estado = "Autorizada";

    this.db.collection("reservas").doc(reserva.uid).set(reserva).then(() => {


      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

  EnviarNotificacion(idUsuario, estado) {
    let direccion = this.url + "?id=" + idUsuario + "&estado=" + estado;
    return this.http.get(direccion).toPromise();
  }


  CancelarReserva(reserva: Reserva) {
    reserva.estado = "Cancelada";

    this.db.collection("reservas").doc(reserva.uid).set(reserva).then(() => {


      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

  MesaReservada(mesa: Mesa) {
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    let now = new Date();
    let fecha = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    let hora = now.getHours() + ":" + now.getMinutes();
    let reservada = false;

    let nowMin = ((Date.parse(hora)) / 1000) / 60;

    this.listaReservasFirebase = this.db.collection<any>("reservas", ref => ref.orderBy('fecha', 'desc'));

    this.listaReservasFirebase.valueChanges()
      .subscribe(array => {

        array.forEach((reserva: Reserva) => {

          let reservaMin = (Date.parse(reserva.hora) / 1000) / 60;

          if ((mesa.numero == reserva.mesas) &&
            (reserva.fecha == fecha) &&
            (nowMin >= reservaMin - 4) &&
            (reserva.estado == "Autorizada")) {
            if (usuario.id != reserva.cliente.uid) {
              reservada = true;
            }

          }
        })
      })
    return reservada;
  }


}
