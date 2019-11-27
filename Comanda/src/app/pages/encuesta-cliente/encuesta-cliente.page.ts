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


  constructor(
    private builder: FormBuilder,
    private encuestaServ: EncuestasService,
    private camera: Camera,
    private usuarios: UsersService,
    private router: Router,
    private mesaServe: MesasService,
    private authService: AuthService
  ) {
    this.url = this.router.url;
    setTimeout(() => {
      this.cliente = this.usuarios.traerUsuarioActual();
      console.log("el usuario actual en encuesta cliente es: ", this.cliente);
    }, 1500);
    this.cantFotos = 1;
    this.puedeSacarFoto = true;
    console.log('this', this.cliente)
  }


  ngOnInit() {
    console.log('PagesEncuestaClientePage');
    this.puedeSacarFoto = true;
  }
  Guardar() {
    let encuesta = new EncuestaCliente();
    encuesta.cliente = this.cliente;
    encuesta.sugerencia = this.sugerencia;
    encuesta.valorMozo = this.valorMozo;
    encuesta.valorCocinero = this.valorCocinero;
    encuesta.valorBartender = this.valorBartender;
    encuesta.valorRestaurant = this.valorRestaurant;
    encuesta.valorMesa = this.valorMesa;

    let encuestaJs = encuesta.dameJSON();
    this.encuestaServ.cargarEncuestaCliente(encuestaJs);
    this.VaciarInputs();
  }

  VaciarInputs() {
    this.valorMozo = 0;
    this.valorCocinero = 0;
    this.valorBartender = 0;
    this.valorMesa = "malo";
    this.valorRestaurant = 0
    this.sugerencia = "";
  }

  async SacarFoto() {

    if (this.cantFotos != 4) {

      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true
      }

      let hora = new Date();
      const result = await this.camera.getPicture(options);
      const fotos = storage().ref('fotos_encuesta_cliente/' + hora + this.cliente.uid + this.cantFotos);
      const imagen = 'data:image/jpeg;base64,' + result;
      fotos.putString(imagen, 'data_url');
      this.cantFotos++;

      if (this.cantFotos == 4) {
        this.puedeSacarFoto == false;
      }

    }

  }

  onLogout() {
    this.mesaServe.mesaActual = null;
    this.usuarios.limpiarUsuarioActual();
    this.authService.logout();
  }


}
