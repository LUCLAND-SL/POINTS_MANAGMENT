import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class AppLogic {

  constructor() { }

  // Método para generar el PDF
  public generarPDF(NombreApellidos: string, DNI: string, Num_puntos: number): void {
    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    doc.setFillColor(112, 173, 71); // Color #70ad47
    doc.rect(10, 10, 190, 4, 'F'); // Rectángulo lleno

    // Añadir la imagen
    const img = new Image();
    img.src = 'assets/LUCLAND-NO-BAK-WHITE.png';

    img.onload = () => {
      doc.addImage(img, 'PNG', 8, 20, 60, 40);

      doc.setFontSize(12); // Ajusta el tamaño según tus necesidades
  
      // Añadir contenido al PDF
      doc.text(`Estimado ${NombreApellidos},`, 10, 70);
      doc.text(`Tras una evaluación detallada de su desempeño laboral durante este mes `, 10, 80);
      doc.text(`de ` + this.getMonthYear() + ` hemos visto que no está alcanzando al número `, 10, 86);
      doc.text(`de puntos requerido mienstras que sus compañeros lo están haciendo.`, 10, 92);
      doc.text(`Su número actual de puntos es ${Num_puntos}`, 10, 98);
  
      // Guardar el PDF
      doc.save('datos_usuario.pdf');
    };
  }

  private getMonthYear(): string {
    const currentDate = new Date();
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${month} del ${year}`;
  }
}