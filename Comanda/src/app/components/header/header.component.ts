import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/services/mesas.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: String;
  @Input() backButton: Boolean;

  @Output() volver:  EventEmitter<any> = new EventEmitter()
  
  url: string;

  constructor(private authService: AuthService, 
    private router: Router, 
    private mesaServe:MesasService, 
    private usuarioServ: UsersService
    ) { 
    console.log(this.router.url);
    this.url = this.router.url;

  }

  ngOnInit() {}

  onLogout() {
    this.mesaServe.mesaActual=null;
    this.usuarioServ.limpiarUsuarioActual();
    this.authService.logout();
    
  }


  volvereBotonera()
  {
      this.volver.emit("true");

  }



}
