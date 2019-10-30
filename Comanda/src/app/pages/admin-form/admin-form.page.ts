import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { CamaraStorageService } from 'src/app/services/camara-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Events } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.page.html',
  styleUrls: ['./admin-form.page.scss'],
})
export class AdminFormPage implements OnInit {

  altaForm: FormGroup;
  foto: any = null;
  urlFoto: string;
  title: string;

  constructor(
    private formBuilder: FormBuilder,
    private camServ: CamaraStorageService,
    private barcodeServ: LectorQrService,
    private toastServ: ToastService,
    private userServ: UsersService,
    public events: Events
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
      perfil: ['', Validators.required]
    });
  }

  setPerfil(perfil) {
    this.altaForm.controls['perfil'].setValue(perfil);
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
          this.altaForm.controls['cuil'].setValue("20-"+dataSlpit[4]+"-2");
        }
      })
      .catch(err => {
        console.error(err.message);
        this.toastServ.errorToast(`Error al scanear: ${err.message}`);
      })
  }

  altaDueno() {

    console.warn(this.altaForm.value);

    const usuario = new User();
    usuario.nombre = this.altaForm.value.nombre;
    usuario.apellido = this.altaForm.value.apellido;
    usuario.dni = this.altaForm.value.dni;
    usuario.cuil = this.altaForm.value.cuil;
    usuario.email = this.altaForm.value.correo;
    usuario.password = this.altaForm.value.clave;
    usuario.perfil = this.altaForm.value.perfil;
    usuario.foto = this.urlFoto;
    usuario.tipo="EMPLEADO";
    usuario.activo=true;

    this.userServ.saveUsuario(usuario)
      .then(res => {
        console.info("save user res", res)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
