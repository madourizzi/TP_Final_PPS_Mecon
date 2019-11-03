import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from 'src/app/models/producto';
import { ToastService } from 'src/app/services/toast.service';
import { AdminFormPage } from 'src/app/pages/admin-form/admin-form.page';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
})
export class ListadoProductosComponent implements OnInit {ç

  productosPedidos: Array<any>;
  acumuladorProductos=0;
  @Output() enviar:  EventEmitter<any> = new EventEmitter();
 admin;

  productos: Array<Producto>;

  constructor(private productosService: ProductosService,
    private toastService: ToastService) {
    this.productos = new Array();
    this.productosPedidos = new Array();
    this.productosService.traerTodosProductos().subscribe(actions => {
      this.productos = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        data.uid = id;
        console.info(data, " data");
        this.productos.push(data);
      });

    });

  }

  ngOnInit() {
   
    this.admin= localStorage.getItem("perfil");
    console.log("perfil" + this.admin);
   }

  elegir(producto)
  {
    //toaster y sumarlo a un array
   this.toastService.confirmationToast("eligio " + producto.nombre);
   this.acumuladorProductos++;
   this.productosPedidos.push(producto);
   console.log(this.productosPedidos);
   
  }

  enviarProducto(producto)
  {
     this.enviar.emit(producto);        
     localStorage.setItem("productoEstado", "false");
  }

}
