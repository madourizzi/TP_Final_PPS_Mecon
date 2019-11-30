import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestaEmpleado } from '../models/encuesta-empleado';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { EncuestaCliente } from '../models/encuesta-cliente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private listaEncuestasFirebase: AngularFirestoreCollection<EncuestaCliente>;
  private listaEncuestasObservable: Observable<EncuestaCliente[]>;

  private listaEncuestasIngresoEmpleadoFirebase: AngularFirestoreCollection<EncuestaEmpleado>;
  private listaEncuestasIngresoEmpleadoObservable: Observable<EncuestaEmpleado[]>;

  private encuestasCollection: AngularFirestoreCollection<any>;
  encuestas: Observable<any[]>;

  constructor(
    public alertCtrl: AlertController,
    private objFirebase: AngularFirestore,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {

    this.encuestasCollection = objFirebase.collection<EncuestaCliente>('encuestas_cliente');
    this.encuestas = this.encuestasCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as EncuestaCliente;
        const id = a.payload.doc.id;
        return { id, data };
      })
    ));

  }

  traerTodasEncuestas() {
    return this.objFirebase.collection('encuestas_cliente').snapshotChanges();
  }

  traerEncuestas() {
    this.listaEncuestasFirebase = this.objFirebase.collection<EncuestaCliente>("encuestas_cliente");
    this.listaEncuestasObservable = this.listaEncuestasFirebase.valueChanges();
    return this.listaEncuestasObservable;
  }

  traerEncuestasClientes() {
    this.listaEncuestasFirebase = this.objFirebase.collection<EncuestaCliente>("encuestas_cliente");
    this.listaEncuestasObservable = this.listaEncuestasFirebase.valueChanges();
    return this.listaEncuestasObservable;
  }

  cargarEncuesta(encuestaAGuardarJSON: any) {
    return this.objFirebase.collection<EncuestaCliente>("encuestas_administrador").add(encuestaAGuardarJSON);
  }

  traerEncuestasEmpleados() {
    this.listaEncuestasIngresoEmpleadoFirebase = this.objFirebase.collection<EncuestaEmpleado>("encuestas_ingreso_empleado");
    this.listaEncuestasIngresoEmpleadoObservable = this.listaEncuestasIngresoEmpleadoFirebase.valueChanges();
    return this.listaEncuestasIngresoEmpleadoObservable;
  }

  cargarEncuestaEmpleado(encuestaAGuardarJSON: any) {
    return this.objFirebase.collection<EncuestaEmpleado>("encuestas_ingreso_empleado").add(encuestaAGuardarJSON);
  }

  async cargarEncuestaCliente(encuestaAGuardarJSON: EncuestaCliente) {

    let id = this.objFirebase.createId();
    encuestaAGuardarJSON.uid = id;
    this.objFirebase.collection<any>("encuestas_cliente").doc(id).set(encuestaAGuardarJSON).then(async (data) => {
      let toast = this.toastCtrl.create({
        message: "En Madou Rizzi valoramos tu opinión. Gracias!",
        duration: 3000,
        position: 'middle'
      });

      (await toast).present();
      console.log(data);
    })
  }
}
