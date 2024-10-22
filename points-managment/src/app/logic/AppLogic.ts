import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class AppLogic {

  constructor() { }

  // Método para generar el PDF
  public generarPDF(Nombre: string, Apellidos: string, DNI: string, Num_puntos: number): void {
    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    // Añadir contenido al PDF
    doc.text(`Nombre: ${Nombre}`, 10, 10);
    doc.text(`Apellidos: ${Apellidos}`, 10, 20);
    doc.text(`DNI: ${DNI}`, 10, 30);
    doc.text(`Número de Puntos: ${Num_puntos}`, 10, 40);

    // Guardar el PDF
    doc.save('datos_usuario.pdf');
  }
}