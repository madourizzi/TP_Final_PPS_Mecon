import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss'],
})
export class ListadoClientesComponent implements OnInit {

  usuarios: Array<User>;
@Output() usuarioElegido: EventEmitter<any>;

  constructor(private authServ: AuthService, private toastService: ToastService, private usuariosServ: UsersService) {
    this.usuarios = new Array();
    this.usuariosServ.traerTodosUsuarios().subscribe(actions => {
      this.usuarios = [];
      actions.map(a => {
        const data = a.payload.doc.data() as User;
        if(data.perfil=="cliente")
        {
          console.info(data, " data");
          this.usuarios.push(data);
        }
      });

    });

    this.usuarioElegido= new EventEmitter();

  }

  ngOnInit() { }

  elegir(empleado) {
      this.usuarioElegido.emit( empleado);
  }

autorizar(producto)
{
  console.log("autoriza");
  
}

noAutorizar(producto)
{
  console.log("NO autoriza");

}


}
