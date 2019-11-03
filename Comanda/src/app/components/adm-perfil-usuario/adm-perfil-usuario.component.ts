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
import { ArchivosService } from 'src/app/services/archivos.service';


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
  ////////////
  opcionElegida;
  fileName;
  //////////////////
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
    private archivos: ArchivosService
  ) {
    this.title = " administrador";
  }

  ngOnInit() {

    this.opcionElegida = 3;

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
        this.archivos.uploadAndroidUpdate(archivo.fileName, archivo.imgBlob, 'users', this.usuario);
        this.foto = false;
        break;
      case 2:
        this.archivos.uploadWebUpdate(this.foto, 'users', this.usuario);
        this.foto = false;
        break;
      case 3:
        this.userServ.actualizarUsuario(this.usuario);
        break;

    }


  }


}
