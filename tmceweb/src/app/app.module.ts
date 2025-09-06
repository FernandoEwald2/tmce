import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Global } from './global';
import { HomeComponent } from './componentes/home/home.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { NgxMaskDirective,provideNgxMask } from 'ngx-mask';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ReceitaComponent } from './receita/receita.component';
import { DespesaComponent } from './despesa/despesa.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuLateralComponent,
    UsuarioComponent,
    ClienteComponent,
    FinanceiroComponent,
    ReceitaComponent,
    DespesaComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,    
    NgxChartsModule,
    HttpClientModule,
    NgxMaskDirective,
    ReactiveFormsModule
    
  ],

  providers: [
    Global,
    provideNgxMask({ /* opções de cfg */ }) 
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
