import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CamaraStorageService } from 'src/app/services/camara-storage.service';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ArchivosService } from 'src/app/services/archivos.service';


@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.page.html',
  styleUrls: ['./cliente-registro.page.scss'],
})
export class ClienteRegistroPage implements OnInit {
  altaForm: FormGroup;
  foto: any = null;
  urlFoto: string;
  public title: string;
  ////////////
  opcionElegida;
  fileName;
  //////////////////
  public usuarioActual: User;

  constructor(
    private formBuilder: FormBuilder,
    private camServ: CamaraStorageService,
    private barcodeServ: LectorQrService,
    private toastServ: ToastService,
    private userServ: UsersService,
    public events: Events,
    private authSvc: AuthService,
    private router: Router,
    private archivos: ArchivosService
  ) {
    this.title = " Registro de Cliente";
    setTimeout(() => {
      this.usuarioActual = this.userServ.traerUsuarioActual();
      console.log('usuario actual en registro de usuario', this.usuarioActual);
    }, 1400);
    if(this.usuarioActual){
      setTimeout(() => {
      this.setCampos();
    }, 1400);
    }
  }

  ngOnInit() {

    this.opcionElegida = 3;

    this.altaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required]
    });

  }

  setCampos(){
    if (this.usuarioActual.nombre) {
      this.altaForm.controls['apellido'].setValue(this.usuarioActual.apellido);
      this.altaForm.controls['nombre'].setValue(this.usuarioActual.nombre);
      this.altaForm.controls['email'].setValue(this.usuarioActual.email);
      this.altaForm.controls['dni'].setValue(this.usuarioActual.dni);
      this.altaForm.controls['cuil'].setValue(this.usuarioActual.cuil);
      this.altaForm.controls['password'].setValue(this.usuarioActual.password);
      
      if(this.usuarioActual.foto){
        this.foto = this.usuarioActual.foto;
      }

    }else if(this.usuarioActual.email){
      setTimeout(() => {
        this.altaForm.controls['email'].setValue(this.usuarioActual.email);
        this.altaForm.controls['password'].setValue(this.usuarioActual.password);
      }, 1400);
    }
  }

  scanDNI() {
    this.barcodeServ.scan()
      .then(barcodeData => {
        if (barcodeData != "") {
          var dataSlpit = barcodeData.text.split("@");
          this.altaForm.controls['apellido'].setValue(dataSlpit[1]);
          this.altaForm.controls['nombre'].setValue(dataSlpit[2]);
          this.altaForm.controls['dni'].setValue(dataSlpit[4]);
          this.altaForm.controls['cuil'].setValue("20-" + dataSlpit[4] + "-2");
        }
      })
      .catch(err => {
        console.error(err.message);
        this.toastServ.errorToast(`Error al scanear: ${err.message}`);
      })
  }


  editarUsuario() {

    this.usuarioActual.nombre = this.altaForm.value.nombre;
    this.usuarioActual.apellido = this.altaForm.value.apellido;
    this.usuarioActual.dni = this.altaForm.value.dni;
    this.usuarioActual.cuil = this.altaForm.value.cuil;
    this.usuarioActual.email = this.altaForm.value.email;
    this.usuarioActual.password = this.altaForm.value.password;
    this.usuarioActual.perfil = "cliente";
    this.usuarioActual.foto = this.foto;
    this.usuarioActual.registrado=true;
    this.subirFoto();
  }

  async tomarFoto() {
    this.foto = await this.archivos.camara();
    this.opcionElegida = 1;
  }

  detectFiles(event) {
    this.opcionElegida = 2;
    this.foto = event;
    this.fileName = event.target.files[0].name;
    console.info("ah elegido una foto", this.foto);

  }


  private subirFoto() {
    switch (this.opcionElegida) {
      case 1:
        let archivo = this.foto;
        console.info(this.foto)
        this.archivos.uploadAndroidUpdate(archivo.fileName, archivo.imgBlob, 'users', this.usuarioActual);
        this.foto = false;
        break;
      case 2:
        this.archivos.uploadWebUpdate(this.foto, 'users', this.usuarioActual);
        this.foto = false;
        break;
      case 3:
        this.userServ.actualizarUsuario(this.usuarioActual);
        break;

    }


  }
}
