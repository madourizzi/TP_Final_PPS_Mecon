import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  lista_de_reservas: Reserva[];

  constructor(public navCtrl: NavController, private reservasProv: ReservasService) {
    this.TraerReservas();
  }

  ngOnInit(){
    console.log('iniciando PagesReservasPage');
  }

  async AutorizarReserva(reserva) {
    await this.reservasProv.AutorizarReseva(reserva);

    this.reservasProv.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data) => {
      console.log(data);
    });
    this.lista_de_reservas = [];

  }

  async CancelarReserva(reserva) {
    await this.reservasProv.CancelarReserva(reserva);
    this.reservasProv.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data) => {
      console.log(data);
    });
    this.lista_de_reservas = [];

  }

  async TraerReservas() {
    this.lista_de_reservas = new Array<Reserva>();
    this.reservasProv.TraerReservas().subscribe((arr) => {
      arr.forEach((res: any) => {
        //console.log(res[0].payload.doc.data()) ;
        this.lista_de_reservas.push(res.payload.doc.data());
      })

    })

    console.log(this.lista_de_reservas);
  }

}
