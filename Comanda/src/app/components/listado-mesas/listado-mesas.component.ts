import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Mesa } from 'src/app/models/mesa';
import { UsersService } from 'src/app/services/users.service';
import { ProductosService } from 'src/app/services/productos.service';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-listado-mesas',
  templateUrl: './listado-mesas.component.html',
  styleUrls: ['./listado-mesas.component.scss'],
})
export class ListadoMesasComponent implements OnInit {

  productosPedidos: Array<any>;
  acumuladorProductos = 0;
  @Output() enviar: EventEmitter<any> = new EventEmitter()

  mesas: Array<Mesa>;

  constructor(private productosService: MesasService,
    private toastService: ToastService) {
    this.mesas = new Array();
    this.productosPedidos = new Array();
    this.productosService.TraerMesas().subscribe(actions => {
      this.mesas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        console.info(data, " data");
        this.mesas.push(data);
      });
      
    });
 

  }

  ngOnInit() { }

  elegir(producto) {
    //toaster y sumarlo a un array
    this.toastService.confirmationToast("eligio mesa" + producto.numero);


  }


}
