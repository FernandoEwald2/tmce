import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // Redireciona a raiz ('') para o login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota da tela de login
  { path: 'login', component: LoginComponent },

  // Layout principal com menu lateral
  {
    path: '',
    component: MenuLateralComponent,
    canActivate: [AuthGuard], //<= Protege as rotas abaixo com o AuthGuard
    children: [
      { path: 'home', component: HomeComponent },
      // Outras rotas dentro do layout vão aqui
    ],
  },

  // Rota coringa: qualquer rota não encontrada redireciona para login
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
