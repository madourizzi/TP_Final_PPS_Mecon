import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { SmartAudioService } from 'src/app/services/smart-audio.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Roles } from 'src/app/models/enums/roles.enum';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  rolesEnum = Roles;

  validation_messages = {
    'mail': [
      { type: 'required', message: 'Debe ingresar un email.' },
      { type: 'email', message: 'Debe ingresar un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Debe ingresar una contraseña.' }
    ]
  };

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private toastService: ToastService, 
    private router: Router, 
    private smartAudioService: SmartAudioService, 
    private vibration: Vibration,
    private afs: AngularFirestore) 
    {

    this.form = this.formBuilder.group({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
  }

 async onSubmitLogin() {
    const credential= await this.authService.login(this.form.get('mail').value, this.form.get('password').value);
    console.log("credential", credential.user);
    return this.updateUserData(credential.user, "site")


      .then(res => {
        console.log(" res",res);
        this.smartAudioService.play('login');
        this.vibration.vibrate(500);
        this.router.navigate(['/home']);

      //////////////// segun perfil del usuario aca definimos el routing





      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          this.toastService.errorToast('Usuario no encontrado.');
        } else if (error.code === 'auth/wrong-password') {
          this.toastService.errorToast('Contraseña incorrecta.');
        } else {
          this.toastService.errorToast('Ocurrió un error, contáctese con el administrador.');
        }
      });
  }

  cargarDatos(rol: Roles) {
    switch (rol) {
      case Roles.admin:
        this.form.get('mail').setValue('mariano@gmail.com');
        this.form.get('password').setValue('123456');
        break;
      case Roles.invitado:
        this.form.get('mail').setValue('lucila@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.usuario:
        this.form.get('mail').setValue('mecha@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.anonimo:
        this.form.get('mail').setValue('nano@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.tester:
        this.form.get('mail').setValue('santiago@gmail.com');
        this.form.get('password').setValue('123456');
        break;
    }
  }



  private updateUserData(user, from ) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL, 
      from:  from,
    }

    return userRef.set(data, { merge: true })

  }





}
