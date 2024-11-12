import { ChangeDetectorRef, Component } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
  selector: 'app-historico',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatTableModule, MatCardModule, MatToolbarModule, MatFormField, MatLabel, MatInputModule, FormsModule, MatExpansionModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  cuadrillas: Cuadrillas = {};
  puntosTotales: { [key: string]: number } = {};
  historico: Mes = {};
  private dataSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.readExcel();
    this.dataSubject.subscribe(data => {
      if (data.length > 0) {
        this.processData(data);
        this.cdr.detectChanges();
      }
    });
  }

  readExcel() {
    const url = 'assets/PuntosTrabajadores2024.xlsx';
    this.http.get(url, { responseType: 'arraybuffer' }).subscribe((data: ArrayBuffer) => {
      const arr = Array.from(new Uint8Array(data));
      const bstr = String.fromCharCode.apply(null, arr);
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const worksheet = workbook.Sheets['Historico CEL'];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.dataSubject.next(jsonData);
    });
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
    this.cdr.detectChanges();
  }

  getMeses(): string[] {
    return Object.keys(this.historico);
  }

  getTotalPuntos(cuadrilla: Trabajador[]): number {
    const total = cuadrilla.reduce((total, trabajador) => total + trabajador.puntos, 0);
    return parseFloat(total.toFixed(2));
  }
  

  getCuadrillasKeys(): string[] {
    return Object.keys(this.cuadrillas);
  }

}
