import { Jugador } from './jugador';

export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: Jugador;
  public gano = false;
  


  constructor(nombre?: string, gano?: boolean,jugador?:Jugador) {
    if (nombre)
      this.nombre = nombre;
    if (gano)
      this.gano = gano;
    if(jugador)
      this.jugador=jugador;
  
  }

  public abstract verificar():boolean; 


  
  public retornarAyuda() {
    
    return "NO hay Ayuda definida";
  }
}
