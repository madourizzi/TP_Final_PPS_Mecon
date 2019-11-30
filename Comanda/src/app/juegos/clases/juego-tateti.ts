import { Jugador } from './jugador';
import { Juego } from './juego';

export class JuegoTateti extends Juego {
  tablero=[[0,0,0],[0,0,0],[0,0,0] ];
  IA_PLAYER = 1;
  USER_PLAYER = 2;
  
  ganoUser: boolean = false;
  ganoUI: boolean = false;
  empate: boolean = false;
  resultado: string;
  listadoBotones: any[];
  listadoBotonesRandom: any[];
  

  constructor(nombre?: string, gano?: boolean, jugador?: Jugador) {
    super("Memoria visuaul", gano, jugador);
  

  this.listadoBotones = new Array();
  this.listadoBotonesRandom = new Array();

  let i: number = 1;
  while (i < 7) {
    this.listadoBotones.push([" "]);
    this.listadoBotonesRandom.push([" "]);
    i++;
  }
}

iaMoves() {
  if(this.ganoUser == false && this.empate == false)
  {
    var options = this.getFreePositions();
    if(options.length != 0)
    {
        
      var optionIndex = this.randomIntTo(options.length-1);
      var coords = options[optionIndex];

      // marcamos la casilla
      this.checkCell(coords[0], coords[1], this.IA_PLAYER);

      var w = this.winner();
      if (w == 1 || w == 2 || w == -1) {
        this.finish(w);
        return true;
      }
      
    }
  }
}




finish(winner) {

  if (winner == this.IA_PLAYER) {
    this.resultado = "Perdiste!";
    this.ganoUI = true;
  } else if (winner == this.USER_PLAYER) {
    this.resultado = "Ganaste!";
    this.ganoUser = true;
  } else {
    this.resultado = "Empate!";
    this.empate = true;
  }
  console.log(this.resultado);
}



// Retorna un int random entre 0 y n inclusive.
randomIntTo(n) {
    let num = Math.floor((Math.random()*n)+1); 
  return num;
}

// Marca la casilla 
checkCell(row, col, player) {
  this.tablero[row][col] = player;
  //console.log(this.tablero);
}


// Devuelve las coordenadas como [fila,columna] de las posiciones libres del tablero
getFreePositions() {
  var freePositions = new Array();
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      if (this.tablero[row][col] == 0) {
        let arr = [row, col];
        //console.log(arr);
        freePositions.push(arr);
      }
    }
  }
  //console.log(freePositions);
  return freePositions;
}


// Retorna 1 si no hay ganador, -1 si hay empate.
winner() {
  // verificar columnas
  for (var c = 0; c <= 2; c++) {
    if (this.tatetiCol(c)) return this.tablero[0][c];
  }
  // verificar filas
  for (var r = 0; r <= 2; r++) {
    if (this.tatetiRow(r)) return this.tablero[r][0];
  }
  // verificar diagonales
  if (this.tatetiDiagonals()) return this.tablero[1][1];
  // verificar empate
  let posiciones = this.getFreePositions();
  if (posiciones.length == 0) return -1; // empate
  //console.log("posiciones disponibles: " +posiciones.length);
  return 0;
}

// True si las celdas de la columna indicada son iguales y no nulas
tatetiCol(col) {
  return this.tablero[0][col] != 0
  && (this.tablero[0][col] == this.tablero[1][col] && this.tablero[1][col] == this.tablero[2][col]);
}

// True si las celdas de la fila indicada son iguales y no nulas
tatetiRow(row) {
  return this.tablero[row][0] != 0
  && (this.tablero[row][0] == this.tablero[row][1] && this.tablero[row][1] == this.tablero[row][2]);
}

// True si alguna de las diagonales tienen valores iguales y no nulos
tatetiDiagonals() {
  return (this.tablero[0][0] != 0 && (this.tablero[0][0] == this.tablero[1][1] && this.tablero[1][1] == this.tablero[2][2]))
  || (this.tablero[0][2] != 0 && (this.tablero[0][2] == this.tablero[1][1] && this.tablero[1][1] == this.tablero[2][0]));
}


verificarG(){
  if(this.ganoUser == false && this.ganoUI == false && this.empate == false)
    return -1;
  if(this.ganoUser)
    return this.USER_PLAYER;
  else if(this.ganoUI)
    return this.IA_PLAYER;
  else if(this.empate)
    return 0;
}

verificar(){
  return true;
}

  
}