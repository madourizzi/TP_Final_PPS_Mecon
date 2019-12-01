import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JuegosService } from '../../services/juegos.service';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { Juego } from '../../clases/juego';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})

export class PiedraPapelTijeraComponent {

  nuevoJuego: JuegoPiedraPapelTijera;
  mensaje: string;
  value: string = "nodef";
 
  constructor(public juegosServicio: JuegosService, private authService: AuthService, private router: Router) {

    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }


  verificar() {

    if (this.value == "nodef") {
      this.mensaje = "Elija una opción para jugar";
      swal(this.mensaje, "Click para continuar", "error");
    } else {
     
      this.nuevoJuego = new JuegoPiedraPapelTijera();
      this.nuevoJuego.valorIngresado = this.value;
      this.nuevoJuego.generarnumero();
      this.juegosServicio.jugadorActual.jugadas++;

      if (this.nuevoJuego.verificar()) {
        this.juegosServicio.jugadorActual.descuento = this.juegosServicio.jugadorActual.descuento + 5;
        this.mensaje = "Ganaste, tienes " + this.juegosServicio.jugadorActual.descuento.toString() + "% de descuento";
        if (this.juegosServicio.jugadorActual.jugadas < 3) {
          this.mensaje = this.mensaje + " , obtén más beneficios en el próximo juego";
          this.mensajePop();
          this.value = "nodef";
        }
        else {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = '<p><b>Resultado:</b></p><p>Tu -> <img src="../../../../assets/' + this.value + '.png" ><p><p align=center><b>  Vs </b></p><p><img src="../../../../assets/' + this.nuevoJuego.valor.toString() + '.png"> <- Android';
          const value = swal('', {
            content: {
              element: wrapper,
            }
      
          }).then(() => {
          swal(this.mensaje, "Click para teminar", "success");
          this.value = "";
          this.router.navigate(['/cliente']);
        })

        }

      } else {
        this.mensaje = "No ganaste, llevas ganado " + this.juegosServicio.jugadorActual.descuento.toString() + " de descuento";
        if (this.juegosServicio.jugadorActual.jugadas < 3) {
          this.mensaje = this.mensaje + " , obtén más beneficios en el próximo juego";
          this.mensajePop();
          this.value = "nodef";
        }
        else {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = '<p><b>Resultado:</b></p><p>Tu -> <img src="../../../../assets/' + this.value + '.png" ><p><p align=center><b>  Vs </b></p><p><img src="../../../../assets/' + this.nuevoJuego.valor.toString() + '.png"> <- Android';
          const value = swal('', {
            content: {
              element: wrapper,
            }
      
          }).then(() => {
          swal(this.mensaje, "Click para teminar", "success");
          this.router.navigate(['/cliente']);
          this.value = "nodef";
        })
      }
      }
      //lo suba a firebase
      this.juegosServicio.registrar();
    }

  }


  mensajePop() {

    let eleccion = {
      buttons: ["Seguir Jugando", "Terminar"],
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<p><b>Resultado:</b></p><p>Tu -> <img src="../../../../assets/' + this.value + '.png" ><p><p align=center><b>  Vs </b></p><p><img src="../../../../assets/' + this.nuevoJuego.valor.toString() + '.png"> <- Android';
    const value = swal('', {
      content: {
        element: wrapper,
      }

    }).then(() => {

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

    });





  }


}
