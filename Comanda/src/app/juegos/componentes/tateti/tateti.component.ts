import { Component, OnInit } from '@angular/core';
import { Tateti } from '../../clases/tateti';
import { AuthService } from 'src/app/services/auth.service';
import { JuegosService } from '../../services/juegos.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  posiciones = [['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']];
  tablero;
  ganoU: boolean = false;
  ganoUI: boolean = false;
  empate: boolean = false;
  enUso: boolean = false;
  puntaje: number = 0;

  nuevoJuego: Tateti;
  mensaje: string = "";

  constructor(public juegosServicio: JuegosService, private authService: AuthService, private router: Router) {
    this.nuevoJuego = new Tateti();
  }

  ngOnInit() {

  }

  nuevoJugada() {
    this.mensaje = "";

    this.nuevoJuego.jugador.uid = this.authService.getCurrentUserId();
    this.nuevoJuego.restart();
    this.ganoU = false;
    this.ganoUI = false;
    this.empate = false;
    this.tablero = this.nuevoJuego.tablero;
    this.posiciones = [['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']];
  }

  presion(number1, number2) {
    if (this.posiciones[number1][number2] == "-") {
      if (this.ganoU != true && this.empate != true && this.ganoUI != true && this.enUso == false) {
        this.enUso = true;
        this.nuevoJuego.userMoves(number1, number2);
        this.tablero = this.nuevoJuego.tablero;
        this.posiciones[number1][number2] = "x";
        this.verificoGanador();

        setTimeout(() => {
          this.tablero = this.nuevoJuego.tablero;
          this.verificarTildar();
          this.enUso = false;

        }, 1500);

      }
    }
  }

  verificarTildar() {
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if (this.tablero[row][col] == 1) {
          this.posiciones[row][col] = "o";
        }
        else if (this.tablero[row][col] == 2) {
          this.posiciones[row][col] = "x";
        }
      }
    }
  }

  verificoGanador() {


    let retorno = this.nuevoJuego.verificarGanador();
    switch (retorno) {
      case -1:
        break;
      case 1:
        this.juegosServicio.jugadorActual.jugadas++;
        this.ganoUI = true;
        this.mensaje = "No ganaste, llevas ganado " + this.juegosServicio.jugadorActual.descuento.toString() + " de descuento";
        if (this.juegosServicio.jugadorActual.jugadas < 3) {
          this.mensaje = this.mensaje + " , obtén más beneficios en el próximo juego";
          this.mensajePop();

        }
        else {

          swal(this.mensaje, "Click para teminar", "success");
          this.router.navigate(['/cliente']);

        }

        this.juegosServicio.registrar();

        break;
      case 2:
        this.juegosServicio.jugadorActual.jugadas++;
        this.ganoU = true;
        this.juegosServicio.jugadorActual.descuento = this.juegosServicio.jugadorActual.descuento + 5;
        this.mensaje = "Ganaste, tienes " + this.juegosServicio.jugadorActual.descuento.toString() + "% de descuento";
        swal(this.mensaje, "Click para teminar", "success");
        this.router.navigate(['/cliente']);
        this.juegosServicio.registrar();
        break;
      case 0:
        this.empate = true;
        this.mensaje = "empataron, este resultado no suma descuentos pero te permite volver a Jugar";
        this.nuevoJuego = new Tateti();        
        this.mensajePop();
        break;
    }




  }












  mensajePop() {

    let eleccion = {
      buttons: ["Seguir Jugando", "Terminar"],
    }
    swal(this.mensaje, eleccion)
      .then((value) => {

        console.info(value);
        switch (value) {
          case null:
            this.router.navigate(['/Juegos/Tateti']);
            break;
          case true:
            this.router.navigate(['/cliente']);
            break;

        }
      });





  }









}