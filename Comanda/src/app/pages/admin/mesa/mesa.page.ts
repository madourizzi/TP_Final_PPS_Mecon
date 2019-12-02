import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { flatMap } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ArchivosService } from 'src/app/services/archivos.service';
import { User } from 'src/app/models/user';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { UsersService } from 'src/app/services/users.service';
import { Mesa } from 'src/app/models/mesa';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {
  altaMesa;
  listaMesa;
  botonera;
  title;
  productoElegido;

  constructor(private spinner: SpinnerService, private mesasService: MesasService, 
    private pedidoServicio: PedidosService, 
    private usuarioServ: UsersService,
    private qr: BarcodeScanner,
    private archivos: ArchivosService) {
    this.title = " administrador";
  }


  ngOnInit() {
    setTimeout(() => this.spinner.hide(), 500);
    this.listaMesa = false;
    this.botonera = true;
    this.altaMesa = false;
    
  }

  verListaMesa() {
    this.listaMesa = true;
    this.botonera = false;
    this.altaMesa = false;
    
  }
  verAltaMesa() {
    this.listaMesa = false;
    this.botonera = false;
    this.altaMesa = true;
    
  }

  volver()
  {
    this.listaMesa = false;
    this.botonera = true;
    this.altaMesa = false;
  }

  
  editarUsu($event)
  {
    this.listaMesa = false;
    this.botonera = false;
    this.altaMesa = true;
    this.productoElegido= $event;        

  }

  
  limpiarTodasLasMesas() {

    
    let mesass = this.mesasService.TraerMesas().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        this.mesasService.limpiarMesa(data);     
        console.log('mesas');        
      });
    });   
   
    
}



limpiarUnaMesa(mesa) {
  this.mesasService.limpiarMesa(mesa);
}


eliminarPedidos() {
  return this.pedidoServicio.traerTodosPedidos().subscribe(actions => {
    actions.map(a => {
      const data = a.payload.doc.data() as Pedido;
      console.log('pedido', data);
      this.pedidoServicio.eliminarPedido(data.uid);
    });
  });
}

eliminarClientes() {
  return this.usuarioServ.traerTodosUsuarios().subscribe(actions => {
    actions.map(a => {
      const data = a.payload.doc.data() as User;
      if (data.registrado) {
        data.registrado = false;
        console.log("true a false");
        this.usuarioServ.actualizarUsuario(data);
      }
    });
  });
}





}
