import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

interface Trabajador {
  trabajador: string;
  puntos: number;
}

interface Cuadrillas {
  [key: string]: Trabajador[];
}

interface Mes {
  [key: string]: Cuadrillas;
}

@Component({
  selector: 'app-historico-emp',
  standalone: true,
  imports: [MatExpansionModule, CommonModule],
  providers: [NavbarComponent, FormsModule, MatTableModule, MatCardModule, MatToolbarModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './historico-emp.component.html',
  styleUrl: './historico-emp.component.css'
})
export class HistoricoEmpComponent {
  cuadrillas: Cuadrillas = {};
  puntosTotales: { [key: string]: number } = {};
  historico: Mes = {};

  ngOnInit(): void {
    this.readExcel();
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
      const worksheet = workbook.Sheets['Historico EMP'];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      this.processData(jsonData);
    };

    oReq.send();
  }

  processData(data: any) {
    const headers = data[0];
    const rows = data.slice(1);

    rows.forEach((row: any) => {
      const mes = row[0]; // Asumiendo que la columna 'Mes' está en la primera posición
      const cuadrilla = row[1]; // Columna 'Cuadrilla'
      const trabajador = row[2]; // Columna 'Trabajador'
      const puntos = row[3]; // Columna 'Puntos'

      if (!this.historico[mes]) {
        this.historico[mes] = {};
      }

      if (!this.historico[mes][cuadrilla]) {
        this.historico[mes][cuadrilla] = [];
      }

      this.historico[mes][cuadrilla].push({
        trabajador: trabajador,
        puntos: puntos
      });
    });
  }

  getMeses(): string[] {
    return Object.keys(this.historico);
  }

  getTotalPuntos(cuadrilla: Trabajador[]): number {
    return cuadrilla.reduce((total, trabajador) => total + trabajador.puntos, 0);
  }

  getCuadrillasKeys(): string[] {
    return Object.keys(this.cuadrillas);
  }
}
