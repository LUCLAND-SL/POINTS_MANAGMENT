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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EmpalmadoresComponent } from './components/empalmadores/empalmadores.component';
import { FormsModule } from '@angular/forms';
import { HistoricoEmpComponent } from './components/historico-emp/historico-emp.component';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HistoricoComponent,
    NormasComponent,
    EmpalmadoresComponent,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    HistoricoEmpComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
