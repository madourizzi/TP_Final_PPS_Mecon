import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Image } from 'src/app/models/image';
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import { ImagesService } from 'src/app/services/images.service';
import { Voto } from 'src/app/models/voto';
import { ToastService } from 'src/app/services/toast.service';
import { Shake } from '@ionic-native/shake/ngx';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() images: Image[];
  @Input() startIndex: Number;
  @Input() uid: string;
  @ViewChild(IonSlides) slider: IonSlides;
  ultimoAlpha: number;
  ultimoBeta: number;
  ultimoGamma: number;
  private flagLeft: boolean;
  private flagRight: boolean;
  private flagObtenerDatos: boolean;


  slideOpts;
  // tslint:disable-next-line: max-line-length
  constructor(navParams: NavParams,
    private shake: Shake,
    private modalController: ModalController,
    private imagesService: ImagesService,
    private toastService: ToastService
  ) {
    //console.clear();
    //console.log(navParams);
    this.images = navParams.data.images;
    this.uid = navParams.data.uid;
    this.startIndex = navParams.data.startIndex;
    this.slideOpts = {
      effect: 'slide',
      initialSlide: this.startIndex
    };
    //console.log(this.images);
    this.flagRight = true;
    this.flagLeft = true;
    this.flagObtenerDatos = true;
    const elistener = event => {
      this.processOrientation(event);
    };

    const shakeListener = () => {
      this.flagRight = true;
      this.flagLeft = true;
      this.slider.slideTo(0);
    };

    window.addEventListener('deviceorientation', elistener, true);
    //console.log(this.images);
    setInterval(x => {
      this.flagObtenerDatos = true;
    }, 1000);

    this.shake.startWatch().subscribe(shakeListener);
  }

  ngOnInit() { }

  votar(index: number) {
    //console.log('votó ' + index);
    const image: Image = this.images[index];

    if (this.verificarVotacion(index)) { // Ya votó esta foto.
      // Remueve el voto de este usuario.
      image.votos = image.votos.filter(voto => {
        return voto.uid !== this.uid;
      });
    } else { // No votó todavía.
      if (!image.votos) {
        image.votos = new Array();
      }
      image.votos.push(new Voto(this.uid));
    }

    this.imagesService.updateItem(image.key, image)
      .catch(error => {
        this.toastService.errorToast('Ocurrió un error al votar. ' + error.message);
      });
  }

  // Verifica si el usuario ya votó.
  verificarVotacion(index: number): boolean {
    const image: Image = this.images[index];
    let respuesta = false;

    if (!image.votos) {
      return false;
    }

    for (let i = 0; i < image.votos.length; i++) {
      const voto = image.votos[i];
      if (voto.uid === this.uid) {
        respuesta = true;
        break;
      }
    }

    return respuesta;
  }

  cantidadDeVotos(index: number): number {
    if (this.images && this.images[index].votos) {
      return this.images[index].votos.length;
    } else {
      return 0;
    }
  }

  eliminar(index: number) {
    this.imagesService.deleteItem(this.images[index].key)
      .then(res => {
        this.images.splice(index);
        this.toastService.confirmationToast('Foto eliminada correctamente.');
        this.modalController.dismiss();
      })
      .catch(error => {
        this.toastService.errorToast('Ocurrió un error. ' + error.message);
      });
  }

  private startLeft() {
    this.flagLeft = true;
    this.flagRight = true;
    this.slider.slidePrev();
    this.slider.lockSwipes(true);
  }
  private startRight() {
    this.flagRight = true;
    this.flagLeft = true;
    this.slider.slideNext();
    this.slider.lockSwipes(true);
  }

  private processOrientation(event: DeviceOrientationEvent) {
    const alpha = event.alpha === null ? 0 : Math.round(event.alpha);
    const beta = event.beta === null ? 0 : Math.round(event.beta);
    const gamma = event.gamma === null ? 0 : Math.round(event.gamma);
    if (this.flagLeft === false && (alpha > 240 && alpha < 330)) {
      this.startRight();
    } else if ((alpha > 331 && alpha < 360) || (alpha > 121 && alpha < 241)) {
      this.flagRight = false;
      this.flagLeft = false;
      this.slider.lockSwipes(false);
    } else if (this.flagRight === false && (alpha > 30 && alpha < 120)) {
      this.startLeft();
    }
  }

}
