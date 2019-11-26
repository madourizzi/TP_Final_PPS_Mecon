import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/services/mesas.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  url: string;
  lista_de_reservas: Reserva[];

  constructor(private reservasSvc: ReservasService, 
    private authService: AuthService, 
    private router: Router,
    private mesaServe:MesasService, 
    private usuarioServ: UsersService) {
    this.TraerReservas();
    this.url = this.router.url;
  }

  ngOnInit(){
    console.log('iniciando PagesReservasPage');
  }

  async AutorizarReserva(reserva) {
    await this.reservasSvc.AutorizarReseva(reserva);

    this.reservasSvc.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data) => {
      console.log(data);
    });
    this.lista_de_reservas = [];

  }

  async CancelarReserva(reserva) {
    await this.reservasSvc.CancelarReserva(reserva);
    this.reservasSvc.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data) => {
      console.log(data);
    });
    this.lista_de_reservas = [];

  }

  async TraerReservas() {
    this.lista_de_reservas = new Array<Reserva>();
    this.reservasSvc.TraerReservas().subscribe((arr) => {
      arr.forEach((res: any) => {
         this.lista_de_reservas.push(res.payload.doc.data());
      })

    })

    console.log(this.lista_de_reservas);
  }


  onLogout() {
    this.mesaServe.mesaActual=null;
    this.usuarioServ.limpiarUsuarioActual();
    this.authService.logout();
    
  }
}
