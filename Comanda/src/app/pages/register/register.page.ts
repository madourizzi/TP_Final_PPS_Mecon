import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/user.class';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User= new User();

  constructor(private authSvc:AuthService, private router: Router, private nativeAudio: NativeAudio) { 
    this.nativeAudio.preloadSimple('txt-alert', 'assets/sound/text_msg_alert.mp3').catch(error => { console.log('error al intentar cargar el del mensaje', error); });
  }

  ngOnInit() {
  }

  async onRegister(){
    const user=await this.authSvc.onRegister(this.user);
    if(user){
      console.log('Exito, usuario creado');
      this.nativeAudio.play("txt-alert");
      this.router.navigateByUrl('/home');
    }
  }

}
