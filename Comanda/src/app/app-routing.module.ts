import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'list/cosasLindas', loadChildren: './pages/list/list.module#ListPageModule', canActivate: [AuthGuard] },
  { path: 'list/cosasFeas', loadChildren: './pages/list/list.module#ListPageModule', canActivate: [AuthGuard] },
  { path: 'list/cosasLindas/stats', loadChildren: './pages/stats/stats.module#StatsPageModule', canActivate: [AuthGuard]  },
  { path: 'list/cosasFeas/stats', loadChildren: './pages/stats/stats.module#StatsPageModule', canActivate: [AuthGuard]  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
