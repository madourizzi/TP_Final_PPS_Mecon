import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Image } from '../models/image';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { TipoLista } from '../models/enums/tipo-lista.enum';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true
  };

  imagePickerOptions: ImagePickerOptions = {
    quality: 50,
    outputType: 1
  };

  imagesRef: AngularFireList<Image>;

  constructor(private camera: Camera, private db: AngularFireDatabase, private imagePicker: ImagePicker
    , private spinner: SpinnerService) {

    this.imagesRef = db.list('images');
    this.imagesRef.snapshotChanges().subscribe(x => {
      this.spinner.hide();
    });
  }

  takePhoto() {
    return this.camera.getPicture(this.options)
      .then(res => {
        return res;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  }

  choosePhoto() {
    return this.imagePicker.getPictures(this.imagePickerOptions)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  }

  saveImage(image: Image) {
    this.spinner.show();
    return this.imagesRef.push(image);
  }
  updateItem(key: string, image: Image) {
    this.spinner.show();
    return this.imagesRef.update(key, image);
  }
  deleteItem(key: string) {
    this.spinner.show();
    return this.imagesRef.remove(key);
  }
  deleteEverything() {
    this.spinner.show();
    return this.imagesRef.remove();
  }

  GetAllImages() {
    this.spinner.show();
    return this.imagesRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .pipe(
        map(images => {
          return images.sort((a, b) => {
            return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
          });
        })
      );
  }

  GetAllImagesByType(tipo: TipoLista) {
    this.spinner.show();
    return this.GetAllImages().pipe(
      map(images => {
        this.spinner.hide();
        return images.filter(image => {
          switch (tipo) {
            case TipoLista.CosasLindas:
              return image.esLinda;
            case TipoLista.CosasFeas:
              return !image.esLinda;
          }
        });
      })
    );
  }

  GetImagesByUser(uid: String, tipo: TipoLista) {
    this.spinner.show();
    return this.GetAllImagesByType(tipo).pipe(
      map(images => {
        return images.filter(image => {
          this.spinner.hide();
          return image.uid === uid;
        });
      })
    );
  }
}
