import { Component, OnInit } from '@angular/core';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { EncuestaCliente } from 'src/app/models/encuesta-cliente';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/services/mesas.service';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.page.html',
  styleUrls: ['./encuesta-cliente.page.scss'],
})
export class EncuestaClientePage implements OnInit {

  cliente;
  valorMozo;
  valorCocinero;
  valorBartender;
  valorMesa;
  valorRestaurant;
  sugerencia;
  puedeSacarFoto: boolean;
  cantFotos: number;
  url: string;
  array_fotos: string[];
  array_fotos_storage: string[];
  perfil;

  constructor(
    private builder: FormBuilder,
    private encuestaServ: EncuestasService,
    private camera: Camera,
    private usuarios: UsersService,
    private router: Router,
    private mesaServe: MesasService,
    private authService: AuthService,
    private toast: ToastService,
  ) {
    this.url = this.router.url;
    this.cliente = JSON.parse(localStorage.getItem('usuario'));
    this.perfil = localStorage.getItem('perfil');
    this.cantFotos = 1;
    this.puedeSacarFoto = true;
    this.array_fotos = new Array<string>();
    this.array_fotos_storage = new Array<string>();
  }


  ngOnInit() {
    this.puedeSacarFoto = true;
    console.log('usuario en encuesta?', this.cliente)
  }




  async SacarFoto() {

    if (this.cantFotos != 4) {

      const options: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true
      }

      let hora = new Date();
      const result = await this.camera.getPicture(options);
      const fotos = storage().ref('fotos_encuesta_cliente/' + hora + this.cliente.email + this.cantFotos);
      const imagen = 'data:image/jpeg;base64,' + result;
      fotos.putString(imagen, 'data_url');
      this.cantFotos++;

      if (this.cantFotos == 4) {
        this.puedeSacarFoto == false;
      }

    }

  }

  async GuardarFoto(idUsuario) {

    await this.array_fotos.forEach(async f => {
      let filename = 'fotos_encuesta_cliente/' + idUsuario + Date.now();
      await storage().ref(filename).putString(f, 'data_url');
      await firebase.storage().ref().child(filename).getDownloadURL().then(async (url) => {
        this.array_fotos_storage.push(url);
      }).catch((data) => {
        console.log(data);
      });
    })
    this.array_fotos.splice(0);
  }


  async TomarFoto() {
    if (this.array_fotos.length <= 2) {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      await this.camera.getPicture(options).then((imageData) => {
        this.array_fotos.push('data:image/jpeg;base64,' + imageData)
      }, (error) => {
        this.toast.errorToast("No se pudieron guardar las fotos.")
      });
    }
    else {
      this.toast.errorToast("Solo puedes tomar 3 fotos.")
    }
  }

  onLogout() {
    this.mesaServe.mesaActual = null;
    this.usuarios.limpiarUsuarioActual();
    this.authService.logout();
  }

  VaciarInputs() {
    this.valorMozo = 0;
    this.valorCocinero = 0;
    this.valorBartender = 0;
    this.valorMesa = 0;
    this.valorRestaurant = 0
    this.sugerencia = "";
  }

  GuardarEncuesta() {
    if (this.array_fotos) {
      this.GuardarFoto(JSON.parse(sessionStorage.getItem("usuario")).uid).then(() => {
        let encuesta = new EncuestaCliente();
        encuesta.cliente = this.cliente.nombre;
        encuesta.sugerencia = this.sugerencia;
        encuesta.valorMozo = this.valorMozo;
        encuesta.valorCocinero = this.valorCocinero;
        encuesta.valorBartender =  this.valorBartender;
        encuesta.valorRestaurant = parseInt( this.valorRestaurant) ;
        encuesta.valorMesa = parseInt(this.valorMesa);
        // encuesta.fotos = this.array_fotos_storage;
        let encuestaJs = encuesta.dameJSON();
        this.encuestaServ.GuardarEncuesta(encuestaJs).then(() => {
          setTimeout(() => {
            this.toast.confirmationToast("encuesta enviada")

          }, 2000);
        }).catch(() => {
          setTimeout(() => {
            this.toast.errorToast("No se guardo la encuesta");
          }, 2000);
        })
        this.VaciarInputs();
        setTimeout(() => {
          this.router.navigate(['/cliente']);
        }, 600);
      })
    }
    else {
      let encuesta = new EncuestaCliente();
      encuesta.cliente = this.cliente.nombre;
      encuesta.sugerencia = this.sugerencia;
      encuesta.valorMozo = this.valorMozo;
      encuesta.valorCocinero = this.valorCocinero;
      encuesta.valorBartender = this.valorBartender;
      encuesta.valorRestaurant = this.valorRestaurant;
      encuesta.valorMesa = this.valorMesa;
      let encuestaJs = encuesta.dameJSON();
      this.encuestaServ.GuardarEncuesta(encuestaJs).then(() => {

        setTimeout(() => {
          this.toast.confirmationToast("encuesta enviada")
        }, 2000);
      }).catch(() => {
        setTimeout(() => {
          this.toast.errorToast("No se guardo la encuesta");
        }, 2000);
      })
      this.VaciarInputs();
      setTimeout(() => {
        this.router.navigate(['/cliente']);
      }, 600);
    }
  }

}