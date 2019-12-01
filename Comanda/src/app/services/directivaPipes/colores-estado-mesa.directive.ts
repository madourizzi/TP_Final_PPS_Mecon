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
        case 'enPreparacion':
          this.el.nativeElement.className = "badge badge-pill badge-warning";
          break;
          case 'postre':
          case 'pagando':
          case 'esperandoComida':
            this.el.nativeElement.className  = "badge badge-pill badge-primary";
        break;
        case 'pagando':
        case 'pedidoListo':
        case 'cerrada':
            this.el.nativeElement.className  = "badge badge-pill badge-danger";
        break;
        case 'disponible':
            this.el.nativeElement.className  = "badge badge-pill badge-dark";
        break;
      }
    },300)}


  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    
  }

}
