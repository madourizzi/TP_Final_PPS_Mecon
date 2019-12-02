import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ImageComponent } from './image/image.component';
import { AdmPerfilUsuarioComponent } from './adm-perfil-usuario/adm-perfil-usuario.component';
import { CargarProductoComponent } from './cargar-producto/cargar-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { ConfirmarPedidoComponent } from './confirmar-pedido/confirmar-pedido.component';
import { ListadoEmpleadosComponent} from './listado-empleados/listado-empleados.component';
import { ListadoPedidosComponent } from './listado-pedidos/listado-pedidos.component';
import { EstadoPedidoComponent } from './estado-pedido/estado-pedido.component';
import { AltaMesaComponent } from './alta-mesa/alta-mesa.component';
import { ListadoMesasComponent } from './listado-mesas/listado-mesas.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { DetalleCuentaComponent } from './detalle-cuenta/detalle-cuenta.component';
import { BotonesEnviarPedidoAreasComponent } from './botones-enviar-pedido-areas/botones-enviar-pedido-areas.component';
import { ColoresEstadoMesaDirective } from '../services/directivaPipes/colores-estado-mesa.directive';
import { AreasPipePipe } from '../services/directivaPipes/areas-pipe.pipe';
import { DatoMesaPipe } from '../services/directivaPipes/dato-mesa.pipe';



@NgModule({
  declarations: [
    HeaderComponent, ListadoClientesComponent, DetalleCuentaComponent, BotonesEnviarPedidoAreasComponent, ColoresEstadoMesaDirective, AreasPipePipe, DatoMesaPipe,
    ImageComponent, AdmPerfilUsuarioComponent, CargarProductoComponent, ListadoProductosComponent,ConfirmarPedidoComponent,
    ListadoEmpleadosComponent, ListadoPedidosComponent, EstadoPedidoComponent, AltaMesaComponent, ListadoMesasComponent, AltaMesaComponent
  ],
  exports: [ 
    HeaderComponent, ListadoClientesComponent, DetalleCuentaComponent, BotonesEnviarPedidoAreasComponent,  AreasPipePipe, DatoMesaPipe,
    ImageComponent, AdmPerfilUsuarioComponent, CargarProductoComponent, ListadoProductosComponent, ConfirmarPedidoComponent,
    ListadoEmpleadosComponent, ListadoPedidosComponent, EstadoPedidoComponent, AltaMesaComponent, ListadoMesasComponent , AltaMesaComponent
  ],
  imports: [
    CommonModule, 
    IonicModule, ReactiveFormsModule
  ],
 
})
export class ComponentsModule { }
