import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  //////
  { path: 'admin-form', loadChildren: './pages/admin-form/admin-form.module#AdminFormPageModule' },
  { path: 'cocina', loadChildren: './pages/cocina/cocina.module#CocinaPageModule' },
  { path: 'mozo', loadChildren: './pages/mozo/mozo.module#MozoPageModule' },
  { path: 'spinner', loadChildren: './pages/spinner/spinner.module#SpinnerPageModule' },
  ///

  { path: 'barman', loadChildren: './pages/barman/barman.module#BarmanPageModule' },
  { path: 'cervecero', loadChildren: './pages/cervecero/cervecero.module#CerveceroPageModule' },
  { path: 'candy-bar', loadChildren: './pages/candy-bar/candy-bar.module#CandyBarPageModule' },

  /// routing del admin
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'mesa', loadChildren: './pages/admin/mesa/mesa.module#MesaPageModule' },
  { path: 'empleados', loadChildren: './pages/admin/empleados/empleados.module#EmpleadosPageModule' },
  { path: 'productos', loadChildren: './pages/admin/productos/productos.module#ProductosPageModule' },
  { path: 'stats', loadChildren: './pages/admin/stats/stats.module#StatsPageModule' },
  { path: 'reservas', loadChildren: './pages/reservas/reservas.module#ReservasPageModule' },
  //routing cliente
  { path: 'cliente', loadChildren: './pages/cliente/cliente.module#ClientePageModule' },
  { path: 'pedir-mesa-qr', loadChildren: './pages/cliente/pedir-mesa-qr/pedir-mesa-qr.module#PedirMesaQrPageModule' },
  { path: 'ocupar-mesa', loadChildren: './pages/cliente/ocupar-mesa/ocupar-mesa.module#OcuparMesaPageModule' },
  { path: 'detalle-mesa', loadChildren: './pages/cliente/detalle-mesa/detalle-mesa.module#DetalleMesaPageModule' },
  { path: 'cliente-registro', loadChildren: './pages/cliente/cliente-registro/cliente-registro.module#ClienteRegistroPageModule' },
  { path: 'reserva', loadChildren: './pages/reserva/reserva.module#ReservaPageModule' }
  





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
