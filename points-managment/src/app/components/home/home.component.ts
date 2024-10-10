import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: any[] = []

  constructor() {}

  ngOnInit(): void {
    this.loadExcelData()
  }

  loadExcelData() {
    const url = 'assets/PuntosTrabajadores2024.xlsx';
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      })
      .catch(error => {
        console.error('Error al cargar el archivo Excel:', error);
      });
  }
}


