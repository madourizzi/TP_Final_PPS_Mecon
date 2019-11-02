import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { ToastService } from 'src/app/services/toast.service';
import { Image } from 'src/app/models/image';
import { TipoLista } from 'src/app/models/enums/tipo-lista.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ImageComponent } from 'src/app/components/image/image.component';
import { GalleryType } from 'src/app/models/enums/gallery-type.enum';
import { Voto } from 'src/app/models/voto';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  entryComponents: [ImageComponent]
})
export class ListPage implements OnInit {
  galleryType: GalleryType;
  title: string;
  tipoLista: TipoLista;
  allPhotos: Image[];
  myPhotos: Image[];
  currentUserId: string;
  galleryTypeEnum = GalleryType;
  PieChart = [];
  votos: any;
  refUserVote: any;
  public actualUrl: string;
  public urlStats: string;



  constructor(
    private router: Router,
    private imagesService: ImagesService,
    private toastService: ToastService,
    private authService: AuthService,
    private modalController: ModalController
  ) {
    this.galleryType = GalleryType.AllPhotos;
    if (this.router.url === '/list/cosasLindas') {
      this.tipoLista = TipoLista.CosasLindas;
      this.title = 'Cosas Lindas';

    } else {
      this.tipoLista = TipoLista.CosasFeas;
      this.title = 'Cosas Feas';

    }

    this.imagesService.GetAllImagesByType(this.tipoLista).subscribe(images => {
      this.allPhotos = images;
      this.actualUrl = this.router.url;
      this.urlStats = (this.actualUrl + '/stats/');
      console.log('url actual?: ', this.urlStats)
    });


    this.currentUserId = this.authService.getCurrentUserId();
    //console.log(this.currentUserId);
    this.imagesService.GetImagesByUser(this.currentUserId, this.tipoLista).subscribe(images => {
      this.myPhotos = images;
      

    });

  }

  ngOnInit() {

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
      .then(imageData => {
        // tslint:disable-next-line: triple-equals
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData);
        } else {
          this.toastService.errorToast(
            'No tomó la foto.'
          );
        }
      })
      .catch(error => {
        this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });
  }

  private subirFoto(imageData) {
    const image: Image = new Image();
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
      });
  }

  openGallery(index: number, galleryType: string) {
    console.log(index);
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
      });
  }
}
