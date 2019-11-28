import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Mesa } from 'src/app/models/mesa';
import { UsersService } from 'src/app/services/users.service';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { User } from 'src/app/models/user';
import { Pedido } from 'src/app/models/pedido';

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

  constructor(private mesasService: MesasService, private pedidoServicio: PedidosService, private usuarioServ: UsersService,
    private toastService: ToastService) {
    this.mesas = new Array();
    this.productosPedidos = new Array();
    this.mesasService.TraerMesas().subscribe(actions => {
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
    alert("eligio mesa" + producto.numero);
  }





  emitirFactura(mesa:Mesa)
  {
    this.mesasService.actualizarMesaEmpleado(mesa, "pagando");
  }

  cerrarMesa(mesa, estado)
  {
    this.mesasService.actualizarMesaEmpleado(mesa, estado);
    setTimeout(()=> this.limpiarUnaMesa(mesa), 5000);
  }



  confirmarReserva(mesa)
  {
    this.mesasService.confirmarMesa(mesa);
  }

  confirmarServicio(mesa)
  {
    this.mesasService.confirmarServicio(mesa);
  }

  entregarPedido(mesa)
  {
    this.mesasService.entregarPedido(mesa);
  }





  limpiarTodasLasMesas() {

    let pedi = this.eliminarPedidos();
  //  this.eliminarClientes();

    let mesass = this.mesasService.TraerMesas().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        this.mesasService.limpiarMesa(data);
        console.log('mesas');
        
      });
    });

    setTimeout(()=>{
      pedi.unsubscribe();
      mesass.unsubscribe();  
    }, 3000);
 
  }



  limpiarUnaMesa(mesa) {
    this.mesasService.limpiarMesa(mesa);
  }


  eliminarPedidos() {
    return this.pedidoServicio.traerTodosPedidos().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Pedido;
        console.log('pedido');
        this.pedidoServicio.eliminarPedido(data.uid);
      });
    });
  }

  eliminarClientes() {
    return this.usuarioServ.traerTodosUsuarios ().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as User;
        if(data.registrado)
        {
          data.registrado=false;
          console.log("true a false");
          this.usuarioServ.actualizarUsuario(data);
        }
      });
    });
  }
}
