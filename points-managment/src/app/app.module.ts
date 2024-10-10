// app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { NormasComponent } from './components/normas/normas.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HistoricoComponent,
    NormasComponent,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
