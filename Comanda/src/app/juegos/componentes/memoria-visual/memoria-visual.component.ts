import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { JuegoMemoria } from '../../clases/juego-memoria';
import { Color } from '../../clases/color';
import { JuegosService } from '../../services/juegos.service';
import { AuthService } from 'src/app/services/auth.service';
import { Juego } from '../../clases/juego';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memoria-visual',
  templateUrl: './memoria-visual.component.html',
  styleUrls: ['./memoria-visual.component.css']
})
export class MemoriaVisualComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoMemoria;
  ocultartablero: boolean;
  Tiempo: number;
  repetidor: any;
  private subscription: Subscription;

  // public listadoBotones: Color[];
  // public listadoBotonesRandom: Color[];
  //  public listadoBotonesResultado: Color[];
  public boton: Color = new Color();
  public btnColor: string = "dark";
  btnNJ: boolean = true;
  btnVf: boolean;
  btnM: boolean = false;
  mensaje: string;
  btnMensje: boolean;
  descuento: number = 0
  jugadas: number = 0;

  constructor(public juegosServicio: JuegosService, private authService: AuthService, private router: Router) {
    this.ocultartablero = true;
    this.Tiempo = 3;
    this.nuevoJuego = new JuegoMemoria();
    console.info("Inicio memoria");
  }

  seleccionado($event) {
    this.boton = $event;
    console.info("el color de boton", this.boton.btnColor);
  }

  seleccionadoColor($event) {
    this.btnColor = $event;
  }



  ngOnInit() {

    const wrapper = document.createElement('div');
    wrapper.innerHTML = "<p>1) Has click en `nuevo´ tendrás 3 segundos para memorizar las posiciones y colores en el tablero</p><p>2) Selecciona el color del panel inferior `+´ y luego ubicalo en el panel haciendo click sobre el recuadro elegido en el tablero </p><p>3) Al finalizar podrás verificar el resultado y obtener beneficios. Éxitos! </p>";
    const value = swal('Bienvenido! Sigue las instrucciones para jugar:', {
      content: {
        element: wrapper,       
      }
      
    });


  }

 
  NuevoJuego() {
    this.nuevoJuego = new JuegoMemoria();
    //this.nuevoJuego.jugador.uid = this.authService.getCurrentUserId();
    this.nuevoJuego.mezcladorColores();

    this.ocultartablero = false;
    this.btnNJ = false;
    this.btnM = true;
    this.btnVf = false;
    this.btnMensje = false;

    this.repetidor = setInterval(() => {
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        this.ocultartablero = true;
        this.btnVf = true;
        this.btnM = false;
        this.Tiempo = 5;
      }
    }, 900);

  }
  verificar() {
    this.jugadas++;    
    console.log("Gano", this.nuevoJuego.verificar());
    this.btnMensje = true;
    if (this.nuevoJuego.verificar()) {
      this.descuento = this.descuento + 5;
      this.mensaje = "Ganaste, tienes " + this.descuento.toString() + "% de descuento";
      if (this.jugadas < 3) {
        this.mensaje = this.mensaje + " , obtén más beneficios en el próximo juego";
        this.mensajePop();
      }
      else {
        swal(this.mensaje, "Click para teminar", "success");
        this.router.navigate(['/cliente']);
      }

    } else {
      this.mensaje = "No ganaste, llevas ganado " + this.descuento.toString() + " de descuento";
      if (this.jugadas < 3) {
        this.mensaje = this.mensaje + " , obtén más beneficios en el próximo juego";
        this.mensajePop();
      }
      else {
        swal(this.mensaje, "Click para teminar", "success");
        this.router.navigate(['/cliente']);
      }
    }



    this.ocultartablero = false;
    this.btnNJ = true;
    this.btnVf = false;
    clearInterval(this.repetidor);
    this.enviarJuego.emit(<Juego>this.nuevoJuego);
    //envio el juego

    this.juegosServicio.registrar(<Juego>this.nuevoJuego);
    console.info(this.juegosServicio.buscartodas());
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
            this.router.navigate(['/Juegos/PPT']);
          break;
          case true:
            this.router.navigate(['/cliente']);
            break;

        }
      });

  }





}



