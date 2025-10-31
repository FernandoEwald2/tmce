import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './telas/home/home.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { AuthGuard } from './auth.guard';
import { UsuarioComponent } from './telas/usuario/usuario.component';
import { ClienteComponent } from './telas/cliente/cliente.component';
import { FinanceiroComponent } from './telas/financeiro/financeiro.component';
import { AgendaComponent } from './telas/agenda/agenda.component';
import { ReceitaComponent } from './componentes/receita/receita.component';
import { DespesaComponent } from './componentes/despesa/despesa.component';


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
      { path: 'usuario', component: UsuarioComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'receita', component: ReceitaComponent },
      { path: 'despesa', component: DespesaComponent },
      { path: 'agenda', component: AgendaComponent },
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
