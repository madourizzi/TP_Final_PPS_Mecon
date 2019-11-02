import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
//////
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'admin-form', loadChildren: './pages/admin-form/admin-form.module#AdminFormPageModule' },
  { path: 'cliente', loadChildren: './pages/cliente/cliente.module#ClientePageModule' },
  { path: 'cocina', loadChildren: './pages/cocina/cocina.module#CocinaPageModule' },
  { path: 'mozo', loadChildren: './pages/mozo/mozo.module#MozoPageModule' },
  { path: 'spinner', loadChildren: './pages/spinner/spinner.module#SpinnerPageModule' },
  ///
 
  { path: 'barman', loadChildren: './pages/barman/barman.module#BarmanPageModule' },
  { path: 'cervecero', loadChildren: './pages/cervecero/cervecero.module#CerveceroPageModule' },
  { path: 'candy-bar', loadChildren: './pages/candy-bar/candy-bar.module#CandyBarPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
