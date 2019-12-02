import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { UsersService } from 'src/app/services/users.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;
  pass2;

  constructor(
    private authSvc: AuthService,
    private usuarios: UsersService,
    private router: Router, private toast: ToastService,
    private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('txt-alert', 'assets/sound/text_msg_alert.mp3').catch(error => { console.log('error al intentar cargar el del mensaje', error); });
    this.user = new User();

  }

  ngOnInit() {
  }

  async onRegister() {

    if (this.user.password == this.pass2) {
      const user = await this.authSvc.onRegister(this.user);
      console.log(user);

      if (user) {
        this.usuarios.enviarUsuario(this.user)
          .then(e => {
            this.usuarios.traerUnUsuarioPorMail(this.user.email);
            console.log('Exito, usuario creado');
            this.nativeAudio.play("txt-alert");
            this.router.navigateByUrl('/login');
          });
      }
    }
    else {
      this.toast.errorToast("las claves no coinciden");
    }
  }

  nuevoEmpleado() {

  }



}
