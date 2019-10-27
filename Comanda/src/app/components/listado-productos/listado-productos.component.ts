import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
})
export class ListadoProductosComponent implements OnInit {ç

  productosPedidos;

  productos: Array<Producto>;

  constructor(private productosService: AuthService) {
    this.productos = new Array();
    this.productosService.traerTodos("producto").subscribe(actions => {
      this.productos = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        data.id = id;
        console.info(data, " data");
        this.productos.push(data);
      });

    });

  }

  ngOnInit() { }

  elegir(producto)
  {

    //toaster y sumarlo a un array
   console.log("eligio " + producto.nombre);
   
  }

}
