import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Color } from '../../clases/color';



@Component({
  selector: 'app-colores-lista',
  templateUrl: './colores-lista.component.html',
  styleUrls: ['./colores-lista.component.css']
})
export class ColoresListaComponent implements OnInit {
  @Input() colorSelecionado:string;
  @Input() listadoBotones: Color[];
  @Input() listadoBotonesRandom: Color[];
  @Output() seSeleccionoBoton: EventEmitter<any> = new EventEmitter();
  @Input() boton: Color;
  @Input() ocultartablero: boolean;

  constructor() { 
    this.listadoBotones= new Array();
    this.listadoBotonesRandom= new Array();
    this.boton = new Color();
    this.ocultartablero= true;
   
  }

  ngOnInit() {


  }

  editar(boton:Color){ 
     this.boton = boton;
     this.boton.btnColor = this.colorSelecionado;
     this.seSeleccionoBoton.emit({boton});
 }

  
}
