import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpMailService } from 'src/app/services/http-mail.service';
import { ToastController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss'],
})
export class ListadoClientesComponent implements OnInit {

  usuarios: Array<User>;
  usuariosCopia: Array<User>;
@Output() usuarioElegido: EventEmitter<any>;

  constructor(private authServ: AuthService,  private spinner: SpinnerService,
    private toastService: ToastService, 
    private usuariosServ: UsersService,
    private emailComposer: EmailComposer, 
    public toastCtrl: ToastController,
    private mailProd: HttpMailService,
    ) {
   
      this.usuarios = new Array();
      this.usuariosCopia = new Array();
      this.usuariosServ.traerTodosUsuarios().subscribe(actions => {
        this.usuarios = [];
        actions.map(a => {
          const data = a.payload.doc.data() as User;
          if(data.perfil=="cliente")
          {
            console.info(data, " data");
            this.usuarios.push(data);
            this.usuariosCopia.push(data);
          }
        });
    
      });
    this.usuarioElegido= new EventEmitter();

  }

  ngOnInit() {  
  }

  elegir(empleado) {
      this.usuarioElegido.emit( empleado);
  }

async autorizar(usuario)
{
  setTimeout(() => this.spinner.hide(), 500);
  console.log(usuario.uid);
  usuario.activo= true;
  this.usuariosServ.actualizarUsuario(usuario);
    this.mailProd.EnviarMail(usuario.email,usuario.uid)
    .then(async (data)=>{

      console.log(data);

      let toast = await this.toastCtrl.create({
        message: "Correo de confirmacion enviado.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })
    .catch(async (data)=>{
      console.log(data);

      let toast = await this.toastCtrl.create({
        message: "Correo de confirmacion enviadou.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })

  console.log("autoriza");
  
}

async autorizarEmpleado(usuario)
{
  setTimeout(() => this.spinner.hide(), 500);
  console.log(usuario.uid);
  usuario.activo= true;
  usuario.perfil="nuevo";
  usuario.nombre=undefined;
  this.usuariosServ.actualizarUsuario(usuario);
    this.mailProd.EnviarMail(usuario.email,usuario.uid)
    .then(async (data)=>{

      console.log(data);

      let toast = await this.toastCtrl.create({
        message: "Correo de confirmacion enviado.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })
    .catch(async (data)=>{
      console.log(data);

      let toast = await this.toastCtrl.create({
        message: "Correo de confirmacion enviadou.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })

  console.log("autoriza");
  
}

async noAutorizar(usuario:User)
{
  usuario.activo= null;
  this.usuariosServ.EliminarUsuario(usuario.uid).then(async (data)=>{
    console.log(data);

    let toast = await this.toastCtrl.create({
      message: "Usuario eliminado.",
      duration: 3000,
      position: 'middle' //middle || top
    });
    toast.present();
  })
  .catch(async (data)=>{
    console.log(data);
    let toast = await this.toastCtrl.create({
      message: "Error al eliminar usuario.",
      duration: 3000,
      position: 'middle' //middle || top
    });
    toast.present();
  })
  console.log("NO autoriza");

}

mostrarTodos()
{
  this.usuarios= this.usuariosCopia;
  
}

mostrarPendientes()
{
  this.usuarios=[];
  this.usuariosCopia.forEach((data : User )=> {
    console.log("data" + data.activo);    
    if(data.activo == null){
      this.usuarios.push(data);
    }
  });
}


}
