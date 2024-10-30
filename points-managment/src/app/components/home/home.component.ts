import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { NavbarService } from '../navbar/navbar.service';
import { AppLogic } from '../../logic/AppLogic';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface Trabajador {
  trabajador: string;
  puntos: number;
}

interface Cuadrillas {
  [key: string]: Trabajador[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatTableModule, MatCardModule, MatToolbarModule, MatFormField, MatLabel, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cuadrillas: Cuadrillas = {};
  puntosTotales: { [key: string]: number } = {};
  currentMonthYear: string = "";
  showNotificationButton: boolean = false;
  nombreApelldos: string = "";
  dni: string = "";
  puntos: number = 0;

  constructor(private navbarService: NavbarService, private logicApp: AppLogic) {
    this.currentMonthYear = this.getCurrentMonthYear();
  }

  getCurrentMonthYear(): string{
    const fechaActual = new Date();
    const meses = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
      'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();
    return `${mes} ${año}`;
  }

  ngOnInit(): void {
    this.readExcel()
    this.showNotificationButton = this.navbarService.getShowNotification();
  }

  readExcel() {
    const url = 'assets/PuntosTrabajadores2024.xlsx';
    const oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer';

    oReq.onload = (e) => {
      const arraybuffer = oReq.response;
      const data = new Uint8Array(arraybuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const worksheet = workbook.Sheets['Mes actual cel'];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      this.processData(jsonData);
    };

    oReq.send();
  }

  processData(data: any) {
    const headers = data[0];
    const rows = data.slice(1);

    rows.forEach((row: any) => {
      const cuadrilla = row[0];
      if (!this.cuadrillas[cuadrilla]) {
        this.cuadrillas[cuadrilla] = [];
        this.puntosTotales[cuadrilla] = 0;
      }

      const puntos = row[2];
      this.cuadrillas[cuadrilla].push({
        trabajador: row[1],
        puntos: row[2]
      });
      this.puntosTotales[cuadrilla] += puntos;
    });
  }

  getCuadrillasKeys(): string[] {
    return Object.keys(this.cuadrillas);
  }

  getPuntosRestantes(cuadrilla: string): number {
    return 925 - this.puntosTotales[cuadrilla];
  }

  generatePDF()
  {
    this.logicApp.generarPDF(this.nombreApelldos,this.dni, this.puntos);
  }
}


