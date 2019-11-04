import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { SmartAudioService } from 'src/app/services/smart-audio.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Roles } from 'src/app/models/enums/perfil.enum';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/models/image';
import { ImageComponent } from '../image/image.component';
import { GalleryType } from 'src/app/models/enums/gallery-type.enum';
import { ArchivosService } from 'src/app/services/archivos.service';
import { Mesa } from 'src/app/models/mesa';
import { LectorQrService } from 'src/app/services/lector-qr.service';
import { MesasService } from 'src/app/services/mesas.service';



@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.component.html',
  styleUrls: ['./alta-mesa.component.scss'],
})
export class AltaMesaComponent implements OnInit {
  form: FormGroup;
  rolesEnum: Roles;
  mesaActual: Mesa;

  selectedFiles;
  fileName;
  opcionElegida: number;
  public url: string;


  validation_messages = {
    'numero': [
      { type: 'required', message: 'Debe ingresar un nombre de Producto' },

    ],
    'cantidadComensales': [
      { type: 'required', message: 'Debe ingresar una Descripcion' },

    ],
    'tipoMesa': [
      { type: 'required', message: 'Debe ingresar stock' },

    ],
    'codigoQr': [
      { type: 'required', message: 'Debe ingresar precio' },

    ],

  };

  constructor(
    private authService: AuthService,
    private mesaServ: MesasService,
    private imagesService: ImagesService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private barcodeServ: LectorQrService,
    private router: Router,
    private smartAudioService: SmartAudioService,
    private vibration: Vibration,
    private afs: AngularFirestore,

    private archivos: ArchivosService) {

    this.form = this.formBuilder.group({
     numero: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      cantidadComensales: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      tipoMesa: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      codigoQr: new FormControl('', Validators.compose([
        Validators.required,

      ]))

    });


    this.mesaActual = new Mesa();

    this.url = ('/admin-form/');

  }

  ngOnInit() {
    console.log("entro a cargar producto");    
    this.opcionElegida=3;
  }


  onSubmitProducto() {
    this.mesaActual.numero=this.form.get('numero').value;
    this.mesaActual.cantidadComensales=this.form.get('cantidadComensales').value;
    this.mesaActual.tipoMesa=this.form.get('tipoMesa').value;
    this.mesaActual.codigoQr=this.form.get('codigoQr').value;
    this.mesaActual.estado= "disponible";
    this.mesaActual.url="./qr_img.png";
    this.subirFoto();
  }

  async tomarFoto() {
    this.selectedFiles = await this.archivos.camara();
    this.opcionElegida = 1;
                /* ionic cordova plugin add cordova-plugin-file
                npm install @ionic-native/file */
  }

  detectFiles(event) {
    this.opcionElegida = 2;
    this.selectedFiles = event;
    this.fileName = event.target.files[0].name;
    this.toastService.confirmationToast("ah elegido una foto");
    console.log("ah elegido una foto", this.selectedFiles);

  }
  cancelar() {
    this.opcionElegida = 0;
    this.selectedFiles = false;

  }



  private subirFoto() {

    switch (this.opcionElegida) {
      case 1:
        let archivo = this.selectedFiles;
        console.info(this.selectedFiles)
        this.archivos.uploadAndroid(archivo.fileName, archivo.imgBlob, 'mesa', this.mesaActual);
        this.selectedFiles = false;

        break;
      case 2:
        console.info(this.selectedFiles)
        this.archivos.uploadWeb(this.selectedFiles, 'mesa', this.mesaActual);
        this.selectedFiles = false;

        break;
      case 3:
        this.selectedFiles = false;
        this.mesaServ.enviarMesa(this.mesaActual);
        break;
 
    }


  }

  
  scanDNI() {
    let resp=this.barcodeServ.abrirScanner().then((e)=> this.form.controls['codigoQr'].setValue(e));
    console.log(resp);
          
  }

  







}
