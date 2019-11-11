import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.scss'],
})
export class ListadoEmpleadosComponent implements OnInit {

  usuarios: Array<User>;
  @Output() usuarioElegido: EventEmitter<any>;

  constructor(private authServ: AuthService, private toastService: ToastService, private usuariosServ: UsersService) {
    this.usuarios = new Array();
    this.usuariosServ.traerTodosUsuarios().subscribe(actions => {
      this.usuarios = [];
      actions.map(a => {
        const data = a.payload.doc.data() as User;
        console.info(" data", data.nombre + data.activo + " + " + data.perfil);
        if (data.perfil != "cliente" && data.activo == true) 
        {
          console.info(" data", data.nombre + data.activo + " + " + data.perfil);
          this.usuarios.push(data);
        }
      });

    });

    this.usuarioElegido = new EventEmitter();

  }

  ngOnInit() { }

  elegir(empleado) {
    this.usuarioElegido.emit(empleado);
  }


}
