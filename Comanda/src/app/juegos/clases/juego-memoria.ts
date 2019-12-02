import { Juego } from '../clases/juego'
import { Color } from './color';
import { Jugador } from './jugador';

export class JuegoMemoria extends Juego {
  public listadoBotones: Color[];
  public listadoBotonesRandom: Color[];
  public boton: Color = new Color();
  public btnColor: string = "dark";

  constructor(nombre?: string, gano?: boolean, jugador?: Jugador) {
    super("Memoria visuaul", gano, jugador);

    this.listadoBotones = new Array();
    this.listadoBotonesRandom = new Array();

    let i: number = 1;
    while (i < 17) {
      this.listadoBotones.push({ id: i, btnColor: "dark" });
      this.listadoBotonesRandom.push({ id: i, btnColor: "dark" });
      i++;
    }
  }

  mezcladorColores() {

    this.RandomColores();    
    let unique = this.getUnique(this.listadoBotonesRandom, 'btnColor');
   
    while(unique.length < 3){
      this.RandomColores();
      unique = this.getUnique(this.listadoBotonesRandom, 'btnColor');
    }
  }

  RandomColores() {
    var coloresArray = ["primary", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "success", "dark", "dark", "dark", "dark", "danger", "dark", "dark", "dark", "dark", "warning", "dark", "dark", "dark", "dark", "dark", "dark", "warning", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "dark", "dark"];
    this.listadoBotonesRandom.forEach((boton, index) => {
      boton.btnColor = coloresArray[Math.floor(Math.random() * coloresArray.length)];
      console.log(index); // 0, 1, 2
    });


   
  }

  getUnique(arr, comp) {
    var unique = arr
        .map(function (e) { return e[comp]; })
        // store the keys of the unique objects
        .map(function (e, i, final) { return final.indexOf(e) === i && i; })
        // eliminate the dead keys & store unique objects
        .filter(function (e) { return arr[e]; }).map(function (e) { return arr[e]; });
    return unique;
}



  compare(a: any, b: any): boolean {
    let flag = a.length;
    for (let i = 0, len = a.length; i < len; i++) {
      if (a[i].id === b[i].id) {
        if (a[i].btnColor === b[i].btnColor) {
          flag--;
        }
      }
    }
    if (flag)
      return false;
    else
      return true;
  }


  public verificar() {
    let equal: boolean = this.compare(this.listadoBotonesRandom, this.listadoBotones);
    console.log(equal);
    console.info("random", this.listadoBotonesRandom)
    console.info("jugados", this.listadoBotones)

    if (equal) {
      this.gano = true;

    }
    if (this.gano) {
      return true;
    } else {
      return false;
    }
  }

}

