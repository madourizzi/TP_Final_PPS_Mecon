import { Injectable, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AuthService } from './auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Producto } from '../models/producto';
import { File } from '@ionic-native/file/ngx';
import { LoadingController } from '@ionic/angular';
import { MesasService } from './mesas.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService implements OnInit {
  task: any;
  aux: any;
  docRefAux: any;

  public mensajeArchivo = 'No hay un archivo seleccionado';

  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  items: Array<any>;

  newName: string;
  dbRef: AngularFirestoreCollection<any>;

  image: any = '';
  selectedFiles: any;
  fileName: string;
  loading;

  constructor(
    private storage: AngularFireStorage,
    private fireStore: AngularFirestore,
    private mesaServ: MesasService,
    private auth: AuthService,
    private camera: Camera,
    private file: File,
    public loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    

  }


  //////// UPLOAD DESDE CAMARA
   /**
    * 
    * @param nombreArchivo NOMBRE DEL ARCHIVO
    * @param datos archivo de datos, creo q es el blob
    * @param tipo coleccion donde se va a guardar
    * @param objeto objeto asociado el url
    */

  async uploadAndroid(nombreArchivo: string, datos: any, tipo, objeto) {

    this.loading = await this.loadingController.create({
      message: 'Cargando Imagen',
      duration: 4000
    });

    var url: any;
    this.aux = nombreArchivo;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(datos);
    this.loading.present();

    lala.percentageChanges().subscribe((porcentaje) => {

      this.porcentaje = Math.round(porcentaje);
      this.loading.message = 'Cargando Imagen: \n' + this.porcentaje.toString();

      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          url = URL;
          this.URLPublica = URL;
          console.log(url + "url");
          this.loading.onDidDismiss();
          objeto.url = url;
          let id = this.fireStore.createId();
          objeto.uid = id;
          this.fireStore.collection(tipo).doc(objeto.uid).set(JSON.parse(JSON.stringify(objeto)));
        }), 3000);
      }
    });
  }

  //////// UPdate DESDE CAMARA
   /**
    * 
    * @param nombreArchivo NOMBRE DEL ARCHIVO
    * @param datos archivo de datos, creo q es el blob
    * @param tipo coleccion donde se va a guardar
    * @param objeto objeto asociado el url coon UID
    */
  async uploadAndroidUpdate(nombreArchivo: string, datos: any, tipo, objeto) {
    
    this.loading = await this.loadingController.create({
      message: 'Cargando Imagen',
      duration: 4000
    });
    var url: any;
    this.aux = nombreArchivo;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(datos);
    this.loading.present();
    lala.percentageChanges().subscribe((porcentaje) => {
     
      this.porcentaje = Math.round(porcentaje);
      this.loading.message = 'Cargando Imagen: \n' + this.porcentaje.toString();

      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          url = URL;
          this.URLPublica = URL;
          console.log(url + "url");
          this.loading.onDidDismiss();
          objeto.foto = url;
          this.fireStore.collection(tipo).doc(objeto.uid).set(JSON.parse(JSON.stringify(objeto)), { merge: true })
        }), 3000);
      }
    });
  }


  //////// UPLOAD DESDE INPUT
  /**
   * 
   * @param event Evento del Archivo que reicbio el input
   * @param tipo nombre de la coleccion
   * @param objeto objeto al cual sera asociado la imagen, que ya existe y tiene el campo UID
   */

  //Tarea para subir archivo desde la web
  // el nombre del archivo esta relacionado con el nombre que le va a quedas
  // esto se podia cambiar por un nombre pasado por pasametro que tenga mas relacion coin algo que querramos
  public uploadWeb(event, tipo, objeto) {
    var url: any;
    this.aux = event.target.files[0].name;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(event.target.files[0]);
    lala.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      console.log(this.porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          objeto.url = url;
          let id = this.fireStore.createId();
          objeto.uid = id;
          this.fireStore.collection(tipo).doc(objeto.uid).set(JSON.parse(JSON.stringify(objeto)))
        }), 3000);
      }
    });


  }


  //////// UPDATE DESDE INPUT
  /**
   * 
   * @param event Evento del Archivo que reicbio el input
   * @param tipo nombre de la coleccion
   * @param objeto objeto al cual sera asociado la imagen, que ya existe y tiene el campo UID
   */
  public uploadWebUpdate(event, tipo, objeto) {
    console.log("eventi,", objeto);
    var url: any;
    this.aux = event.target.files[0].name;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(event.target.files[0]);
    lala.percentageChanges().subscribe((porcentaje) => {
      //////
      this.porcentaje = Math.round(porcentaje);
      /////
      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          objeto.foto = url;
          this.fireStore.doc(tipo + `/${objeto.uid}`).set(JSON.parse(JSON.stringify(objeto)), { merge: true })
        }), 3000);
      }
    });
  }

  /**
   * 
   * @param event Evento del Archivo que reicbio el input
   * @param tipo nombre de la coleccion
   * @param objeto objeto al cual sera asociado la imagen, que ya existe y tiene el campo ID
   */
  public uploadWebUpdateID(event, tipo, objeto) {
    console.log("eventi,", objeto);
    var url: any;
    this.aux = event.target.files[0].name;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(event.target.files[0]);
    lala.percentageChanges().subscribe((porcentaje) => {
      ////// loading
      this.porcentaje = Math.round(porcentaje);
      /////
      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          objeto.url = url;
          this.fireStore.doc(tipo + `/${objeto.id}`).set(JSON.parse(JSON.stringify(objeto)), { merge: true })
        }), 3000);
      }
    });


  }


  ////////////////////////// camara
  async camara() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      let cameraInfo = await this.camera.getPicture(options);
      this.image = (<any>window).Ionic.WebView.convertFileSrc(cameraInfo);
      console.log('cameraInfo' + cameraInfo);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      this.selectedFiles = blobInfo;
      return this.selectedFiles;
    } catch (e) {
      console.log(e.message);
      alert("No se subio el archivo " + e.message);
    }
  }

/**
 * convierte la imagen en blob para subirlo q este listo para subir al storage
 * @param _imagePath 
 */
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;
          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg",
          });
          console.log("imgBlob.type, imgBlob.size");
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

/////////////////// base 64
  uploadToStorage(info): AngularFireUploadTask {
    this.newName = `${new Date().getTime()}.jpeg`;
    let image = `data:image/jpeg;base64,${info}`;
    return this.storage.ref(`archivos/${this.newName}`).putString(image, 'data_url');
  }
////////// ?????
  storeInfoDatabase(data) {
    return this.dbRef.doc(this.newName).set(data);
  }

}

