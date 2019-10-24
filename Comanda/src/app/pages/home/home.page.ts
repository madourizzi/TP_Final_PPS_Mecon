import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

/*
1.- Relevamiento visual (testeado en más de un dispositivo):
Ingresar un usuario. (registrado en BD)
Seleccionar un BOTÓN de dos posibles (Cosas LINDAS del edificio, Cosas FEAS del edificio).
Los botones deben de ocupar toda la pantalla (TODA LA PANTALLA) y poseer imágenes alusivas.
Al ingresar a una sección, nos permite tomar una foto y subirla a la nube.
El nombre del usuario tiene que estar relacionado con la foto.
Los demás usuarios tienen que ver la foto subida.
El listado de fotos se tiene que mostrar ordenado por fecha de forma DESCENDENTE.
Permitir votar la cosa más linda y la más fea del edificio (un voto por foto).
+ Permitir ver los resultados en gráficos de torta (para las lindas) y de barra (para las feas).
+ Permitir subir más de una foto a la vez.
+ Mostrar el listado de las fotos que el usuario subió.
+ Al seleccionar un resultado del gráfico, mostrar la foto correspondiente.
*/