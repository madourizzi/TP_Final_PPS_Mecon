import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colores-menu',
  templateUrl: './colores-menu.component.html',
  styleUrls: ['./colores-menu.component.css']
})
export class ColoresMenuComponent implements OnInit {
  @Output() seSeleccionoColor: EventEmitter<any>;
  color:string;
  constructor() {
    this.seSeleccionoColor =new  EventEmitter<any>();   
   }

  ngOnInit() {
  }
  
  cambiarColor(color: string){
    this.seSeleccionoColor.emit(color);       
  }


}
