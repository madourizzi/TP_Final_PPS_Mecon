import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor() { }

  listado = [];


  registrar(jugada: Juego){ 
    this.listado=JSON.parse(localStorage.getItem("Jugadas"));
    console.info('antes', this.listado);
    this.listado.push({juego:jugada.nombre,jugador:jugada.jugador.nombre,resultado:jugada.gano});
    console.info('push', this.listado);
    localStorage.setItem("Jugadas", JSON.stringify(this.listado));
    console.info('local final', JSON.parse(localStorage.getItem("Jugadas"))); 
    }

  buscartodas(){
    return JSON.parse(localStorage.getItem("Jugadas"));
  }
}
