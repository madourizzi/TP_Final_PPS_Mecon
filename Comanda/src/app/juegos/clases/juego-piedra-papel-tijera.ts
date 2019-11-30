import { Juego } from '../clases/juego'
import { Jugador } from './jugador';

export class JuegoPiedraPapelTijera extends  Juego {
    valorIngresado:string;
    valor: string;
    constructor(nombre?: string, gano?: boolean, jugador?:Jugador) {
        super("Piedra, papel o tijera",gano,jugador); 
      }
    public verificar():boolean {

        switch (this.valorIngresado) {
            case "piedra":
              if(this.valor=="tijera") {
                this.gano = true;
              }
              if (this.gano) {
                return true;
              } else {
                return false;
              }
              break;
              case "papel":
                if(this.valor=="piedra") {
                    this.gano = true;
                  }
                  if (this.gano) {
                    return true;
                  } else {
                    return false;
                  }
              break;
              case "tijera":
                if(this.valor=="papel") {
                    this.gano = true;
                  }
                  if (this.gano) {
                    return true;
                  } else {
                    return false;
                  }
              break;
        }
     }
     public generarnumero():void {
        var Array = ["piedra", "papel", "tijera"];
         this.valor = Array[Math.floor(Math.random() * Array.length)];
        console.info('numero Secreto:' + this.valor);
        this.gano = false;
      }
}

