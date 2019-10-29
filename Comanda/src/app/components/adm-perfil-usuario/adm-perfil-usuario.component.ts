import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CamaraStorageService } from 'src/app/services/camara-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { UsersService } from 'src/app/services/users.service';
import { Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-adm-perfil-usuario',
  templateUrl: './adm-perfil-usuario.component.html',
  styleUrls: ['./adm-perfil-usuario.component.scss'],
})
export class AdmPerfilUsuarioComponent implements OnInit {

  altaForm: FormGroup;
  foto: any = null;
  urlFoto: string;
  title: string;
  @Input() usuario: User;

  constructor(
    private formBuilder: FormBuilder,
    private camServ: CamaraStorageService,
    private barcodeServ: LectorQrService,
    private toastServ: ToastService,
    private userServ: UsersService,
    public events: Events,
    private authSvc: AuthService,
    private router: Router,
  ) {
    this.title = " administrador";
  }

  ngOnInit() {

    this.altaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      perfil: ['', Validators.required],
      activo: ['', Validators.required]
    });


    this.altaForm.controls['apellido'].setValue(this.usuario.apellido);
    this.altaForm.controls['nombre'].setValue(this.usuario.nombre);
    this.altaForm.controls['email'].setValue(this.usuario.email);
    this.altaForm.controls['dni'].setValue(this.usuario.dni);
    this.altaForm.controls['cuil'].setValue(this.usuario.cuil);
    this.altaForm.controls['password'].setValue(this.usuario.password);
    this.altaForm.controls['perfil'].setValue(this.usuario.perfil);
    this.altaForm.controls['activo'].setValue(this.usuario.activo);
    this.foto = this.usuario.foto;


  }

  setPerfil(perfil) {
    this.altaForm.controls['perfil'].setValue(perfil);
  }

  setEstado(activo) {
    this.altaForm.controls['activo'].setValue(activo);
  }

  takeFoto() {
    this.camServ.takePhoto()
      .then(imgData => {
        if (imgData !== 'No Image Selected') {
          this.saveFoto(imgData);
          this.foto = `data:image/jpeg;base64,${imgData}`;
        } else {
          this.toastServ.errorToast("No se pudo tomar la foto");
        }
      })
      .catch(error => {
        this.toastServ.errorToast(`Error al tomar foto: ${error.message}`);
      })
  }

  saveFoto(data: any) {
    var res = this.camServ.uploadPhoto(data)
      .then((res) => {

        this.toastServ.confirmationToast("Foto guardada")
      })
      .catch(err => {
        this.toastServ.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      })
    this.events.subscribe('urlFotoGuardada', url => {
      console.info("evento url", url);
      this.urlFoto = url;
    });
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

    this.usuario.nombre = this.altaForm.value.nombre;
    this.usuario.apellido = this.altaForm.value.apellido;
    this.usuario.dni = this.altaForm.value.dni;
    this.usuario.cuil = this.altaForm.value.cuil;
    this.usuario.email = this.altaForm.value.email;
    this.usuario.password = this.altaForm.value.password;
    this.usuario.perfil = this.altaForm.value.perfil;
    this.usuario.foto = this.foto;

    if (this.altaForm.value.activo) {
      this.usuario.activo = true
    } else {
      this.usuario.activo = false
    }

    this.authSvc.updateUser(this.usuario);

  }
}
