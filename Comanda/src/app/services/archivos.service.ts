import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AuthService } from './auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Producto } from '../models/producto';
import { File } from '@ionic-native/file/ngx';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
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

  constructor(
    private storage: AngularFireStorage,
    private fireStore: AngularFirestore,
    private auth: AuthService,
    private camera: Camera,
    private file: File,
    public loadingController: LoadingController,
  ) { }





  //Referencia del archivo
  async uploadAndroid(nombreArchivo: string, datos: any, tipo, objeto) {

    const loading = await this.loadingController.create({
      message: 'Cargando Imagen',
      duration: 4000
    });

    var url: any;
    this.aux = nombreArchivo;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(datos);
    loading.present();
    lala.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);

      loading.message = 'Cargando Imagen: \n' + this.porcentaje.toString();

      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          url = URL;
          this.URLPublica = URL;
          console.log(url + "url");
          loading.onDidDismiss();
          objeto.url= url;
          this.fireStore.collection(tipo).add(JSON.parse(JSON.stringify(objeto))) 
        }), 3000);
      }
    });
  }


  //Tarea para subir archivo desde la web
  // el nombre del archivo esta relacionado con el nombre que le va a quedas
  // esto se podia cambiar por un nombre pasado por pasametro que tenga mas relacion coin algo que querramos
  public uploadWeb(event, tipo, objeto) {
    var url: any;
    this.aux = event.target.files[0].name;
    var lala = this.storage.ref(tipo + '/' + this.aux).put(event.target.files[0]);
    lala.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      console.log("this.porcentaje" + this.porcentaje)
      if (this.porcentaje == 100) {
        this.finalizado = true;
        setTimeout(() => this.storage.ref(tipo + '/' + this.aux).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          objeto.url= url;
          this.fireStore.collection(tipo).add(JSON.parse(JSON.stringify(objeto)))
        }), 3000);
      }
    });


  }


//////////////////////////
  async camara(tipo) {
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
      // this.cargarImagen(tipo); esto hace que se cargue solo
      return this.selectedFiles; 
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }



/*     /////////////////
    async cargarImagen(tipo) {
      let archivo = this.selectedFiles;
      console.info(this.selectedFiles);
      this.uploadAndroid(archivo.fileName, archivo.imgBlob, tipo, this.auth.getCurrentUserMail());
    }
 */


  // FILE STUFF
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

  uploadToStorage(info): AngularFireUploadTask {
    this.newName = `${new Date().getTime()}.jpeg`;
    let image = `data:image/jpeg;base64,${info}`;
    return this.storage.ref(`archivos/${this.newName}`).putString(image, 'data_url');
  }

  storeInfoDatabase(data) {
    return this.dbRef.doc(this.newName).set(data);
  }

}

