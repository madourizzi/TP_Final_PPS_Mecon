import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from 'src/app/models/producto';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
})
export class ListadoProductosComponent implements OnInit {ç

  productosPedidos: Array<any>;
  acumuladorProductos=0;
  @Output() enviar:  EventEmitter<any> = new EventEmitter()

  productos: Array<Producto>;

  constructor(private productosService: AuthService,
    private toastService: ToastService) {
    this.productos = new Array();
    this.productosPedidos = new Array();
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
   this.toastService.confirmationToast("eligio " + producto.nombre);
   this.acumuladorProductos++;
   this.productosPedidos.push(producto);
   console.log(this.productosPedidos);
   
  }

  enviarPedido()
  {
     this.enviar.emit(this.productosPedidos);
        
  }

}
