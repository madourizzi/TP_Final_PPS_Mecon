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



@Component({
  selector: 'app-cargar-producto',
  templateUrl: './cargar-producto.component.html',
  styleUrls: ['./cargar-producto.component.scss'],
})
export class CargarProductoComponent implements OnInit {


  form: FormGroup;
  rolesEnum : Roles;


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
    private afs: AngularFirestore) 
    {

    this.form = this.formBuilder.group({
      nombreProducto: new FormControl('', Validators.compose([
        Validators.required, 
      ]))

    });

  }

  ngOnInit() {
  }

 onSubmitProducto() {
   
   
   console.log(this.form.get('nombreProducto').value);
   
     
  }

  elegirFoto() {
    this.imagesService.choosePhoto()
      .then(imageData => {
        if (imageData !== '' || imageData !== 'OK') {
          for (let i = 0; i < imageData.length; i++) {
            this.subirFoto(imageData[i]);
          }
        } else {
          this.toastService.errorToast(
            'No eligió una foto.'
          );
        }
      })
      .catch(error => {
        this.toastService.errorToast('Error: No se han podido cargar las fotos. ' + error.message);
      });
  }

  tomarFoto() {
    this.imagesService
      .takePhoto()
      /* .then(imageData => {
        // tslint:disable-next-line: triple-equals
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData);
        } else {
          this.toastService.errorToast(
            'No tomó la foto.'
          );
        }
      }) */
      .catch(error => {
        this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });
  }

  private subirFoto(imageData) {
/*     const image: Image = new Image();
    image.esLinda = this.tipoLista == TipoLista.CosasLindas;
    image.uid = this.currentUserId;
    image.umail = this.authService.getCurrentUserMail();
    image.image = 'data:image/jpg;base64,' + imageData;
    image.votos = new Array();
    image.fecha = new Date().toLocaleString();
    this.imagesService
      .saveImage(image)
      .then(() => {
        this.toastService.confirmationToast(
          'Su foto se ha guardado correctamente.'
        );
      })
      .catch(error => {
        this.toastService.errorToast(
          'Error: No se ha podido guardar la foto. ' + error.message
        );
      }); */
  }

  openGallery(index: number, galleryType: string) {
   /*  console.log(index);
    this.modalController.create({
      component: ImageComponent,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true,
      cssClass: 'my-custom-modal-css',
      componentProps: { images: galleryType === GalleryType.AllPhotos ? this.allPhotos : this.myPhotos, startIndex: index, uid: this.currentUserId }
    })
      .then(modal => {
        console.log(modal.componentProps);
        modal.present();
      }); */
  }





}
