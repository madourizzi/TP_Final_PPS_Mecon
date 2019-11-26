import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { User } from 'src/app/models/user';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ReservasService } from 'src/app/services/reservas.service';
import { MesasService } from 'src/app/services/mesas.service';
import { ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  reservas: Array<Reserva>;
  usuario: User;
  mesas;
  hoy: string;
 
  url: string;
  tresDiasDespues: string;

  constructor(
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    private usuarios: UsersService,
    private reservaSvc: ReservasService,
    private authService: AuthService, 
    private router: Router,
    private mesaServe:MesasService, 
    private usuarioServ: UsersService) {

    this.url = this.router.url;
    this.TraerReservas();

  }

  ngOnInit() {
    setTimeout(() => {
      this.usuario = this.usuarios.traerUsuarioActual();
      console.log("el usuario actual es: ", this.usuario);
    }, 1500);

    this.hoy = new Date().toISOString();
    this.tresDiasDespues= new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(); 
 
  }

  fecha = new FormControl('', [
    Validators.required
  ]);
  hora = new FormControl('', [
    Validators.required
  ]);

  cant_comensales = new FormControl('', [
    Validators.required,
  ]);

  registroForm: FormGroup = this.builder.group({
    fecha: this.fecha,
    hora: this.hora,
    cant_comensales: this.cant_comensales,
  });

  Registrar() {

    let reserva = new Reserva();
    reserva.fecha = this.registroForm.get('fecha').value;
    reserva.hora = this.registroForm.get('hora').value;
    reserva.cliente = this.usuario;
    let cant_comensales = this.registroForm.get('cant_comensales').value;
    let tipo="normal";
    this.BuscarMesaReserva(reserva.fecha, reserva.hora, cant_comensales, tipo);

  }


  async BuscarMesaReserva(fecha, hora, cant_comensales, tipo) {
    let laReserva: Reserva;
    let disponible: boolean = true;
    let ok: boolean = true;

    let mesasAdecuadas = this.mesaServe.mesas.filter((mesa) => {
      return (mesa.cantidadComensales >= cant_comensales && mesa.tipoMesa == tipo);
    });

    mesasAdecuadas.forEach(async (mesa) => {
      disponible = true;

      if (ok) {
        this.reservas.forEach((reserva) => {
          let fechaAReservar = new Date(fecha + " " + hora);
          let fechaRservada = new Date(reserva.fecha + " " + reserva.hora);
          let minReserva = ((Date.parse(fechaRservada.toString())) / 1000) / 60;
          let minLaReserva = (Date.parse(fechaAReservar.toString()) / 1000) / 60;

          if ((mesa.numero == reserva.mesas &&
            reserva.fecha == fecha) && (minLaReserva > minReserva - 30 && minLaReserva < minReserva + 30)) {

            disponible = false;
          }

        })

        if (disponible) {

          laReserva = new Reserva();
          laReserva.mesas = mesa.numero;
          laReserva.fecha = fecha;
          laReserva.hora = hora;
          laReserva.cliente = this.usuario;
          laReserva.estado = "pendiente";
          ok = false;

          await this.reservaSvc.GuardarReserva(laReserva);


        }

      }

    })

    if (!disponible) {
      let toast = this.toastCtrl.create({
        message: "Lo sentimos, no hay mesas disponibles para esa fecha/horario",
        duration: 3000,
        position: 'middle' //middle || top
      });
      (await toast).present();
    }
    console.log(this.reservas);
  }

  async TraerReservas() {
    this.reservas = new Array<Reserva>();
    this.reservaSvc.TraerReservas().subscribe((arr) => {
      arr.forEach((res: any) => {
        this.reservas.push(res.payload.doc.data());
      })
    })
  }

  onLogout() {
    this.mesaServe.mesaActual=null;
    this.usuarioServ.limpiarUsuarioActual();
    this.authService.logout();
    
  }

}
