import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { SmartAudioService } from 'src/app/services/smart-audio.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Roles } from 'src/app/models/enums/perfil.enum';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

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
    const credential= await this.authService.login(this.form.get('mail').value, this.form.get('password').value)
      .then(res => {

        this.authService.traerTodosUsuarios().subscribe(user => {
          user.forEach(userData => {
            let data = userData.payload.doc.data() as User;
            let id = userData.payload.doc.id;
            data.uid = id;
            console.log(data, "data");
            console.log(id + "id");
  
            if (data.email == this.authService.getCurrentUserMail()) {
              localStorage.setItem("uid",  id);
              this.smartAudioService.play('login');
              this.vibration.vibrate(500);
              switch(data.perfil)
              {
                /// segun perfil del usuario aca definimos el routing
                case "admin":
                    this.router.navigate(['/admin']);
                    break;
                case "cliente":                  
                    this.router.navigate(['/cliente']);
                    break;
                case "mozo":                  
                    this.router.navigate(['/mozo']);
                    break;
                case "cocina":                  
                    this.router.navigate(['/cocina']);
                    break;
                case "barman":                  
                    this.router.navigate(['/barman']);
                    break;
                case "cervecero":                  
                    this.router.navigate(['/cervecero']);
                    break;
                case "candyBar":                
                    this.router.navigate(['/candy-bar']);
                    break;
              }
            }
          });
        });
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
      case Roles.barman:
        this.form.get('mail').setValue('lucila@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.candyBar:
        this.form.get('mail').setValue('mecha@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.cliente:
        this.form.get('mail').setValue('nano@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.cocina:
        this.form.get('mail').setValue('santiago@gmail.com');
        this.form.get('password').setValue('123456');
        break;
        case Roles.mozo:
        this.form.get('mail').setValue('santiago@gmail.com');
        this.form.get('password').setValue('123456');
        break;

    }
  }









}
