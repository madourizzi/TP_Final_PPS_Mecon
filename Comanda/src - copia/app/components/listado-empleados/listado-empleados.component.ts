import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.scss'],
})
export class ListadoEmpleadosComponent implements OnInit {

  usuarios: Array<User>;
@Output() usuarioElegido: EventEmitter<any>;

  constructor(private usuariosService: AuthService, private toastService: ToastService) {
    this.usuarios = new Array();
    this.usuariosService.traerTodos("users").subscribe(actions => {
      this.usuarios = [];
      actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        data.uid = id;
        if(data.perfil!="cliente")
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


}
