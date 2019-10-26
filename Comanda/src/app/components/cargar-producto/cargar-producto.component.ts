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
import { Producto } from 'src/app/models/producto';



@Component({
  selector: 'app-cargar-producto',
  templateUrl: './cargar-producto.component.html',
  styleUrls: ['./cargar-producto.component.scss'],
})
export class CargarProductoComponent implements OnInit {


  form: FormGroup;
  rolesEnum: Roles;
  productoActual: Producto;

  selectedFiles;
  fileName;
  opcionElegida: number;


  validation_messages = {
    'nombreProducto': [
      { type: 'required', message: 'Debe ingresar un nombre de Producto' },
      { type: 'text', message: 'Solo texto.' }
    ]
  };

  constructor(
    private authService: AuthService,
    private imagesService: ImagesService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private smartAudioService: SmartAudioService,
    private vibration: Vibration,
    private afs: AngularFirestore,
    private archivos: ArchivosService) {

    this.form = this.formBuilder.group({
      nombreProducto: new FormControl('', Validators.compose([
        Validators.required,
      ]))

    });


    this.productoActual = new Producto();
    this.productoActual.nombre=" birrita";
    this.productoActual.descripcion=" birrita en la terraza";
    this.productoActual.stock=100;
    this.productoActual.precio=100;
    this.productoActual.url="./qr_img.png";
  

  }

  ngOnInit() {
    this.opcionElegida=0;
  }


  onSubmitProducto() {
    console.log(this.form.get('nombreProducto').value);
    this.subirFoto();
  }

  async tomarFoto() {
    this.selectedFiles = await this.archivos.camara('producto');
    this.opcionElegida = 1;
                /* ionic cordova plugin add cordova-plugin-file
                npm install @ionic-native/file */
  }

  detectFiles(event) {
    this.opcionElegida = 2;
    this.selectedFiles = event;
    this.fileName = event.target.files[0].name;
    this.toastService.confirmationToast("ah elegido una foto");
    console.log("ah elegido una foto");

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
        this.archivos.uploadAndroid(archivo.fileName, archivo.imgBlob, 'producto', this.productoActual);
        this.selectedFiles = false;

        break;
      case 2:
        this.archivos.uploadWeb(this.selectedFiles, 'producto', this.productoActual);
        this.selectedFiles = false;

        break;
      default:
        alert("carga cancelada");
        break
    }


  }

  







}
