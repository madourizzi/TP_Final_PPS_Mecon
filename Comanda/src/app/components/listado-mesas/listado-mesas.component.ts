import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Mesa } from 'src/app/models/mesa';

@Component({
  selector: 'app-listado-mesas',
  templateUrl: './listado-mesas.component.html',
  styleUrls: ['./listado-mesas.component.scss'],
})
export class ListadoMesasComponent implements OnInit {

  productosPedidos: Array<any>;
  acumuladorProductos=0;
  @Output() enviar:  EventEmitter<any> = new EventEmitter()

  mesas: Array<Mesa>;

  constructor(private productosService: AuthService,
    private toastService: ToastService) {
    this.mesas= new Array();
    this.productosPedidos = new Array();
    this.productosService.traerTodos("mesa").subscribe(actions => {
      this.mesas= [];
      actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        const id = a.payload.doc.id;
        data.id = id;
        console.info(data, " data");
        this.mesas.push(data);
      });

    });

  }

  ngOnInit() { }

  elegir(producto)
  {
    //toaster y sumarlo a un array
   this.toastService.confirmationToast("eligio mesa" + producto.numero);

   
  }


}
