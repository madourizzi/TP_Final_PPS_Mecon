import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColoresEstadoMesa]'
})
export class ColoresEstadoMesaDirective {
 
  @Input() estado;

  constructor(private el: ElementRef) {
    this.cambiarColor();
  }

  cambiarColor() {

    setTimeout(()=> {
      console.log("this.estado", this.estado);    
      console.log("this.el", this.el);    

      switch(this.estado)
      {
        case 'comida':
        case 'cocina':
        case 'enPreparacion':
          this.el.nativeElement.style ="--background: orange;"
       //   this.el.nativeElement.className = "badge badge-pill badge-warning";

          break;
          case 'postre':
          case 'pagando':
          case 'esperandoComida':
            this.el.nativeElement.style ="--background: green;";
        break;
        case 'pagando':
        case 'pedidoListo':
        case 'cerrada':
        case 'barra':
        case 'solicitada':
            this.el.nativeElement.style ="--background: red;";
        break;
        case 'disponible':
        case 'cerveza':
            this.el.nativeElement.style ="--background: black;";
        break;
        default:
            this.el.nativeElement.style ="--background:  rgb(43, 224, 224);";
        break;
      }
    },300)}


  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    
  }

}
