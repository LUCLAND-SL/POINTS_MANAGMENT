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

    doc.setFillColor(112, 173, 71); // Color #70ad47
    doc.rect(10, 10, 190, 6, 'F'); // Rectángulo lleno

    // Añadir la imagen
    const img = new Image();
    img.src = 'assets/LUCLAND-NO-BAK-WHITE.png';

    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 20, 60, 40);
  
      // Añadir contenido al PDF
      doc.text(`Nombre: ${Nombre}`, 10, 100);
      doc.text(`Apellidos: ${Apellidos}`, 10, 110);
      doc.text(`DNI: ${DNI}`, 10, 120);
      doc.text(`Número de Puntos: ${Num_puntos}`, 10, 130);
  
      // Guardar el PDF
      doc.save('datos_usuario.pdf');
    };
  }
}