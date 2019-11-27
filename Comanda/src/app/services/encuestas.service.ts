import { Injectable } from '@angular/core';
import { EncuestaAdministrador } from '../models/encuesta-administrador';
import { Observable } from 'rxjs';
import { EncuestaEmpleado } from '../models/encuesta-empleado';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private listaEncuestasFirebase: AngularFirestoreCollection<EncuestaAdministrador>;
  private listaEncuestasObservable: Observable<EncuestaAdministrador[]>;
  
  private listaEncuestasIngresoEmpleadoFirebase: AngularFirestoreCollection<EncuestaEmpleado>;
  private listaEncuestasIngresoEmpleadoObservable: Observable<EncuestaEmpleado[]>;

    constructor(
      public alertCtrl: AlertController,
      private objFirebase: AngularFirestore,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController
    ) {

    }

  traerEncuestas() {
    this.listaEncuestasFirebase = this.objFirebase.collection<EncuestaAdministrador>("encuestas_administrador");
    this.listaEncuestasObservable = this.listaEncuestasFirebase.valueChanges();
    return this.listaEncuestasObservable;
  }

  cargarEncuesta(encuestaAGuardarJSON: any){
    return this.objFirebase.collection<EncuestaAdministrador>("encuestas_administrador").add(encuestaAGuardarJSON);
  }

  traerEncuestasEmpleados(){
    this.listaEncuestasIngresoEmpleadoFirebase = this.objFirebase.collection<EncuestaEmpleado>("encuestas_ingreso_empleado");
    this.listaEncuestasIngresoEmpleadoObservable = this.listaEncuestasIngresoEmpleadoFirebase.valueChanges();
    return this.listaEncuestasIngresoEmpleadoObservable;
  }

  cargarEncuestaEmpleado(encuestaAGuardarJSON: any){
    return this.objFirebase.collection<EncuestaEmpleado>("encuestas_ingreso_empleado").add(encuestaAGuardarJSON);
  }

  async cargarEncuestaCliente(encuestaAGuardarJSON: any){
    let id=this.objFirebase.createId();
    this.objFirebase.collection<any>("encuestas_cliente").doc(id).set(encuestaAGuardarJSON).then(async (data)=>{
      let toast = this.toastCtrl.create({
        message: "En Madou Rizzi valoramos tu opinión. Gracias!",
        duration: 3000,
        position: 'middle' //middle || top
      });
      
      (await toast).present();
      console.log(data);
    })
  }
}
