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
import { NgxViacepModule } from '@brunoc/ngx-viacep';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuLateralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxViacepModule 
    
  ],
  providers: [Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
