import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;

  constructor(
    private authSvc:AuthService, 
    private router: Router, 
    private nativeAudio: NativeAudio) 
    { 
    this.nativeAudio.preloadSimple('txt-alert', 'assets/sound/text_msg_alert.mp3').catch(error => { console.log('error al intentar cargar el del mensaje', error); });
      this.user= new User();

  }

  ngOnInit() {
  }

  async onRegister(){

    console.log("this.user" +  this.user);
    
    const user = await this.authSvc.onRegister(this.user);
    console.log(user);
  
    if(user){
      this.authSvc.enviarUsuario(this.user)
      .then( e =>{
        console.log('Exito, usuario creado');
        this.nativeAudio.play("txt-alert");
        this.router.navigateByUrl('/home');
      });
    }
  }



}
