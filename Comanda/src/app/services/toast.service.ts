import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SmartAudioService } from './smart-audio.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController, private smartAudioService: SmartAudioService
    , private vibration: Vibration) { }

  errorToast(message: string) {
    this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      color: 'danger',
      closeButtonText: 'Cerrar',
      duration: 3000
    })
    .then( res => {
      this.vibration.vibrate(1000);
      this.smartAudioService.play('error');
      res.present();
    });
  }

  confirmationToast(message: string) {
    this.toastController.create({
      message: message,
      showCloseButton: true,
      color: 'success',
      position: 'middle',
      closeButtonText: 'Cerrar',
      duration: 2000
    })
    .then( res => {
      this.vibration.vibrate(1000);
      res.present();
    });
  }

  confirmationToastEncuesta(message: string) {
    this.toastController.create({
      message: message,
      showCloseButton: true,
      color: 'success',
      position: 'bottom',
      closeButtonText: 'Cerrar',
      duration: 4000
    })
    .then( res => {
      this.vibration.vibrate(1000);
      res.present();
    });
  }
}
