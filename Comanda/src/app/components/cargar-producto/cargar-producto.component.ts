import { Component, OnInit, Input } from '@angular/core';
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
  foto;


  selectedFiles;
  fileName;
  opcionElegida: number;
  public url: string;
  @Input() productoActual: Producto;
  nuevo;


  validation_messages = {
    'nombreProducto': [
      { type: 'required', message: 'Debe ingresar un nombre de Producto' },
      { type: 'text', message: 'Solo texto.' }
    ],
    'descripcion': [
      { type: 'required', message: 'Debe ingresar una Descripcion' },
      { type: 'text', message: 'Solo texto.' }
    ],
    'stock': [
      { type: 'required', message: 'Debe ingresar stock' },
      { type: 'number', message: 'Solo Números.' }
    ],
    'precio': [
      { type: 'required', message: 'Debe ingresar precio' },
      { type: 'number', message: 'Solo Números.' }
    ],
    'tipo': [
      { type: 'required', message: 'Debe ingresar un tipo' },
    ],

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

      ])),
      descripcion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.required,
      ])),
      stock: new FormControl('', Validators.compose([
        Validators.required,
        Validators.required,
      ])),
      precio: new FormControl('', Validators.compose([
        Validators.required,
        Validators.required,
      ])),
     tipo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.required,
      ]))

    });


    this.url = ('/admin-form/');


  }

  ngOnInit() {
    console.log("entro a cargar producto");
    this.nuevo = localStorage.getItem("productoEstado");
    console.log("elegiso", this.productoActual);
    this.opcionElegida = 3;


    try {
      this.form.controls['nombreProducto'].setValue(this.productoActual.nombre);
      this.form.controls['descripcion'].setValue(this.productoActual.descripcion);
      this.form.controls['stock'].setValue(this.productoActual.stock);
      this.form.controls['precio'].setValue(this.productoActual.precio);
      this.form.controls['tipo'].setValue(this.productoActual.tipo);
      this.foto = this.productoActual.url;
    } catch (e) {
      console.log("try produciot", e);
      this.productoActual = new Producto();

    }finally{

    }



  }


  setTipo(perfil) {
    this.productoActual.tipo=perfil;    
    this.form.controls['tipo'].setValue(perfil);
  }



  onSubmitProducto() {
    this.productoActual.nombre = this.form.get('nombreProducto').value;
    this.productoActual.descripcion = this.form.get('descripcion').value;
    this.productoActual.stock = this.form.get('stock').value;
    this.productoActual.precio = this.form.get('precio').value;
    this.productoActual.tipo= this.form.get('tipo').value;
    console.log(this.form.get('nombreProducto').value);
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


  modificar() {
    console.info("this.productoActual", this.productoActual);
    this.productoActual.nombre = this.form.get('nombreProducto').value;
    this.productoActual.descripcion = this.form.get('descripcion').value;
    this.productoActual.stock = this.form.get('stock').value;
    this.productoActual.precio = this.form.get('precio').value;


    switch (this.opcionElegida) {
      case 1:
        let archivo = this.selectedFiles;
        this.archivos.uploadAndroidUpdate(archivo.fileName, archivo.imgBlob, 'producto', this.productoActual);
        this.selectedFiles = false;
        break;
      case 2:
        this.archivos.uploadWebUpdateID(this.selectedFiles, 'producto', this.productoActual);
        this.selectedFiles = false;
        break;
      case 3:
        this.selectedFiles = false;
        this.afs.doc(`producto/${this.productoActual.uid}`).set(JSON.parse(JSON.stringify(this.productoActual)), { merge: true })
        break;
      default:
        alert("carga cancelada");
        break
    }




  }

  eliminar() {
    this.productoActual.estado = "baja";
    this.afs.doc(`producto/${this.productoActual.uid}`).delete();


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
      case 3:
        this.selectedFiles = false;
        let id = this.afs.createId();
        this.productoActual.uid = id;
        this.afs.collection('producto').doc(this.productoActual.uid).set(JSON.parse(JSON.stringify(this.productoActual)));
        break;
      default:
        alert("carga cancelada");
        break
    }




  }









}
