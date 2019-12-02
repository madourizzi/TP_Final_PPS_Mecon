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
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { PedidosService } from './pedidos.service';

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
    public http: HttpClient, private router: Router, private pedidoSer: PedidosService,
    private objFirebase: AngularFirestore,
    private qrService: LectorQrService,
    public toastCtrl: ToastController,
    public usuarioServ: UsersService, private spinner: SpinnerService,
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

  limpiarMesa(mesaABlanquear: Mesa) 
  {
    this.usuarioServ.limpiarDescuento(this.usuarioServ.traerUnUsuarioPorMailMozo(mesaABlanquear.cliente));
    mesaABlanquear.pedidos.forEach(e=>
      {
        this.pedidoSer.eliminarPedido(e)
      });
      mesaABlanquear.cliente = "sin asignar";
      mesaABlanquear.propina = 0;
     mesaABlanquear.descuento = 0;
    mesaABlanquear.pedidos = new Array();
    mesaABlanquear.estado = "disponible";
    return this.objFirebase.collection("mesa").doc(mesaABlanquear.uid).set(JSON.parse(JSON.stringify(mesaABlanquear)), { merge: true });
  }

  /**
   * 
   * @param comensales 
   */
  async leerQrPedirMesa() {
    await this.qrService.abrirScanner().then(async QRdata => {
      if ("madourizzi@solicitudDeMesa" == QRdata) {
        this.router.navigate(['/pedir-mesa-qr']);
      }
      else {
        const toast = await this.toastCtrl.create({
          message: "Codigo QR incorrecto",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
        this.spinner.hide();
      }
    }).catch()
    {

    };
  }
  /**
   * 
   * @param comensales 
   */
  async propinaQr() {

  return this.qrService.abrirScanner().then(async QRdata => {
      switch (QRdata) {
        case 'propina0':
         return 0;
        case 'propina5':
          return 5;
        case 'propina10':
          return 10;
        case 'propina15':
          return 15;
        case 'propina20':
          return 20;
          default:
            return this.mesaActual.propina;


      }



    }).catch()
    {

    };
  }



  /**
   * 
   * @param comensales 
   */
  traerTodasDisponible(comensales) {

    const mesasDisponible = this.MesasDisponibles();
    let mesasReturn: Array<Mesa> = new Array<Mesa>()
    mesasDisponible.forEach(async (mesa: Mesa) => {
      console.log("entra a mesas disponibole foreach");

      if (mesa.estado === 'disponible' && mesa.cantidadComensales >= comensales && (comensales + 5) >= mesa.cantidadComensales) {

        mesasReturn.push(mesa);
        const toast = await this.toastCtrl.create({
          message: mesa.numero + " disponible",
          duration: 1000,
          position: 'top',
          color: "warning"
          //middle || top
        });
        toast.present();
      }
    });

    if (mesasReturn.length == 0) {
      alert('no hay mesas disponible, no anda toaster');
      /*  const toast = await this.toastCtrl.create({
         message: 'No hay mesas disponibles',
         duration: 1000,
         position: 'top',
         color: "warning"
         //middle || top
       });
       toast.present(); */

    }

    return mesasReturn;


  }



  /**
   * 
   * @param comensales 
   */
  solicitarMesa(mesa: Mesa) {
    this.mesaActual = mesa;
    return this.actualizarMesaNueva(this.mesaActual, 'solicitada');

  }

  actualizarMesaNueva(mesa: Mesa, estado) {
    mesa.estado = estado;
    mesa.cliente = this.usuarioServ.traerUsuarioActual().email;
    return this.objFirebase.collection('mesa').doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }








  actualizarMesa(mesa: Mesa, estado) {
    mesa.estado = estado;
    mesa.cliente = this.usuarioServ.traerUsuarioActual().email;
    return this.objFirebase.collection("mesa").doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }

  async confirmarMesa(mesa) {
    this.actualizarMesaMozo(mesa, 'reservada');

    const toast = await this.toastCtrl.create({
      message: 'buscar a ' + mesa.cliente + 'para llevarlo a su mesa',
      duration: 3000,
      position: 'top',
      color: "secondary"
      //middle || top
    });
    toast.present();

  }

  traerUnaMesaUID(id) {
    return this.objFirebase.collection('mesa').doc(id).snapshotChanges();
  }


  async confirmarServicio(mesa) {
    this.actualizarMesaMozo(mesa, 'inicioServicio');
    const toast = await this.toastCtrl.create({
      message: 'Cliente' + mesa.cliente + 'Iniciado servicio',
      duration: 3000,
      position: 'top',
      color: "danger"
      //middle || top
    });
    toast.present();

  }

  async entregarPedido(mesa: Mesa) {

    switch (mesa.estado) {
      case 'pedidoListo':
        this.actualizarMesaMozo(mesa, localStorage.getItem('pedidosP'));
        break;
    }
  }



  actualizarMesaMozo(mesa: Mesa, estado) {
    mesa.estado = estado;
    return this.objFirebase.collection('mesa').doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }


  actualizarMesaEmpleado(mesa: Mesa, estado) {
    mesa.estado = estado;
    return this.objFirebase.collection('mesa').doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }


  traerMesaPorUsuarioMail(mail) {
    return this.objFirebase.collection("mesa").snapshotChanges().subscribe(e => {
      e.map(a => {
        const data = a.payload.doc.data() as Mesa;
        if (data.cliente == mail) {
          this.mesaActual = data;
          //localStorage.setItem('perfil', this.usuarioActual.perfil)
          console.info(" traerMesaPorUsuarioMail(mail)", this.mesaActual);
        }

      });

    })
  }



  EstadoPedido() {
    return this.qrService.readQR().then(async QRdata => {
      console.log(QRdata.text);
      let flag = false;
      this.mesas.forEach(async (mesa: Mesa) => {

        if (mesa.codigoQr == QRdata.text) {
          this.mesaActual = mesa;
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