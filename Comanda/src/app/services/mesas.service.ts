import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mesa } from '../models/mesa';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LectorQrService } from './lector-qr.service';
import { ToastController } from '@ionic/angular';
import { UsersService } from './users.service';
import { getRandomColor } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private listaMesasFirebase: AngularFirestoreCollection<Mesa>;
  public listaMesasObservable: Observable<Mesa[]>;
  private listaMesasMozoFirebase: AngularFirestoreCollection<Mesa>;
  private listaMesasMozoObservable: Observable<Mesa[]>;


  public mesas: Array<Mesa>;
  public mesasId: Array<any>;
  //public mesasDisponibles: Array<Mesa>;
  public usuarioEnMesa: User;
  mesaActual: Mesa = null;

  constructor(
    public http: HttpClient,
    private objFirebase: AngularFirestore,
    private qrService: LectorQrService,
    public toastCtrl: ToastController,
    public usuarioServ: UsersService,
  ) {

    this.mesas = new Array();
    this.TraerMesas().subscribe(
      actions => actions.forEach(a => {
        const data = a.payload.doc.data() as Mesa;
           
        this.mesas.push(data);
      })
    );

  }

  TraerMesas() {
    this.listaMesasFirebase = this.objFirebase.collection<Mesa>("mesa", ref => ref.orderBy('numero', 'asc'));
    return this.listaMesasFirebase.snapshotChanges();
  }




  TraerMesasMozo() {
    this.listaMesasMozoFirebase = this.objFirebase.collection<any>("mesa", ref => ref.orderBy('numero', 'asc'));
    this.listaMesasMozoObservable = this.listaMesasMozoFirebase.valueChanges();
    return this.listaMesasMozoObservable;
  }

  enviarMesa(nuevoUsuario: Mesa) {
    let id = this.objFirebase.createId();
    nuevoUsuario.uid = id;
    this.mesaActual = nuevoUsuario;
    return this.objFirebase.collection("mesa").doc(id).set(JSON.parse(JSON.stringify(nuevoUsuario)), { merge: true });
  }

  limpiarMesa(mesaABlanquear: Mesa) {
    mesaABlanquear.cliente = "sin asignar";
    mesaABlanquear.pedidos = new Array();
    mesaABlanquear.estado = "disponible";
    return this.objFirebase.collection("mesa").doc(mesaABlanquear.uid).set(JSON.parse(JSON.stringify(mesaABlanquear)), { merge: true });
  }

  /**
   * 
   * @param comensales 
   */
  async asignarMesaDisponible(comensales) {

    const mesasDisponible = this.MesasDisponibles();
    console.log("mesas disponibles ", mesasDisponible);


/*     return this.qrService.readQR().then(async QRdata => {
      let flagQR = false;
      if ("madourizzi@solicitudDeMesa" == QRdata.text) {
        flagQR = true;
        console.log("entro bien el qr pero algo se rompio"); */
        let flag2 = false;
     return  mesasDisponible.forEach(async (mesa: Mesa) => { //sacar este return cuando se saca el comentando para el qr

          if (flag2 == false) {
            console.log("mf", mesa);

            if (mesa.estado == "disponible" && mesa.cantidadComensales >= comensales) {
              flag2 = true;
              console.log("disponible", mesa);
              this.mesaActual = mesa;
              this.actualizarMesa(this.mesaActual, "reservada");
              const toast = await this.toastCtrl.create({
                message: "La mesa nro: " + this.mesaActual.numero + " se encuentra reservada para usted.",
                duration: 3000,
                position: 'middle',
                color: "secondary"
                //middle || top
              });
              toast.present();
              return true;
            }
          }

        });
        if (!flag2) {
          const toast = await this.toastCtrl.create({
            message: "No hay mesa disponible",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();
          return false;
        }
      }

/* 
      if (!flagQR) {
        const toast = await this.toastCtrl.create({
          message: "Codigo QR incorrecto",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
        return false;
      }
    }).catch(err => {
      return false;
      console.log('Error', err);
    });
  } */


  actualizarMesa(mesa: Mesa, estado) {
    mesa.estado = estado;
    mesa.cliente = this.usuarioServ.traerUsuarioActual().email;
    return this.objFirebase.collection("mesa").doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }



  traerMesaPorUsuarioMail(mail) {
    return this.objFirebase.collection("mesa").snapshotChanges().subscribe(e => {
       e.map(a => {
         const data = a.payload.doc.data() as Mesa; 
         console.log("contruecot", data);   
         if (data.cliente == mail) {
          console.log("contruecot2", data);   
           this.mesaActual = data;
           //localStorage.setItem('perfil', this.usuarioActual.perfil)
           console.info(" traerMesaPorUsuarioMail(mail)", this.mesaActual);
         }
 
       });
 
     })
   }


  
  EstadoPedido() {
    this.TraerMesas();

    this.qrService.readQR().then(async QRdata => {

      console.log(QRdata.text);

      let flag = false;
      this.mesas.forEach(async (mesa: Mesa) => {



        if (mesa.codigoQr == QRdata.text) {
          flag = true;
          const toast = await this.toastCtrl.create({
            message: "La mesa nro: " + mesa.numero + " se encuentra " + mesa.estado + ".",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();
        }

      });

      if (!flag) {
        const toast = await this.toastCtrl.create({
          message: "Codigo QR incorrecto",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
      }

    }).catch(err => {
      console.log('Error', err);
    });


  }

  MesasDisponibles() {
    let mesasFiltradas = [];
    mesasFiltradas = this.mesas.filter(mesas => mesas.estado == 'disponible');
    return mesasFiltradas;
  }


  RelacionMesaUsuario(numeroMesa) {
    this.usuarioEnMesa = null;
    this.mesas.forEach(mesa => {
      if (mesa.numero == numeroMesa) {
        if (mesa.usuario) {
          this.usuarioEnMesa = mesa.usuario;
          console.log("La mesa esta siendo ocupada por: " + mesa.usuario.nombre);
        }
      }
    });
    return this.usuarioEnMesa;
  }




  async cambiarEstadoMesaOcupada() {
    var usuario = this.usuarioServ.traerUsuarioActual();
    /* return this.qrService.readQR().then(async QRdata => {

      if (this.mesaActual.codigoQr == QRdata.text) { */

        if (this.mesaActual.estado == 'reservada' && this.mesaActual.cliente == usuario.email) {

          this.actualizarMesa(this.mesaActual, "ocupada");
          this.mesaActual.estado = "ocupada";

          const toast = await this.toastCtrl.create({
            message: "La mesa nro: " + this.mesaActual.numero + " es ocupada por " + usuario.nombre + " " + usuario.apellido,
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();
          return true;

        } else if (this.mesaActual.estado == 'reservada') {
          const toast = await this.toastCtrl.create({
            message: "La mesa Nro " + this.mesaActual.numero + " no es su reserva",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();
          return false;
        }
      } /* else {
        const toast = await this.toastCtrl.create({
          message: "usuario y qr incorrectos",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
        return false;

      }

    }).catch(err => {
      return false;
      console.log('Error', err);
    })
  }
 */
  LiberarMesa(mesa: Mesa) {
    mesa.estado = "disponible";
    mesa.usuario = null;
    this.objFirebase.collection("SP_mesas").doc(mesa.uid).set(mesa).then(() => {
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

}