import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JuegosService } from '../../services/juegos.service';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})

export class PiedraPapelTijeraComponent  {

  nuevoJuego: JuegoPiedraPapelTijera;
  mensaje: string;
  constructor(public juegosServicio: JuegosService, private authService: AuthService) {
    
    this.nuevoJuego = new JuegoPiedraPapelTijera();
   }

  
   templateForm(value: any) {
    this.nuevoJuego = new JuegoPiedraPapelTijera();

    this.nuevoJuego.generarnumero();   
 
    if (value.inlineRadioOptions == ""){
      this.mensaje="Elija una opción para jugar";
    }
    else {
      this.nuevoJuego.valorIngresado = value.inlineRadioOptions;
      if(this.nuevoJuego.verificar()){
        this.mensaje="Ganaste!!";
      }else {
        this.mensaje="No ganaste, vuelve a intertarlo";

      }
    }
  }


}
