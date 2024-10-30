import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class AppLogic {
  currentDate: string;

  constructor() { 
    this.currentDate = this.getCurrentDate();
  }

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
      doc.setFont("helvetica", "bold");
      doc.text(`Su número actual de puntos es ${Num_puntos}.`, 10, 101);
      // Volver a la fuente normal
      doc.setFont("helvetica", "normal");
      doc.text(`En este sentido, queremos enfatizar que cualquier duda, inquietud o propuesta `, 10, 110);
      doc.text(`de mejora que considere necesaria para lograr estos objetivos, no dude en comentárnosla. `, 10, 116);
      doc.text(`Estamos aquí para apoyarle y trabajar juntos en la consecución de nuestras metas comunes. `, 10, 122);
      doc.text(`Agradecemos su compromiso y dedicación. `, 10, 130);
      doc.text(`Atentamente, `, 10, 136);
      doc.text(`LUCLAND OBRA CIVIL S.L. `, 10, 148);
      doc.text(`Emitido y firmado por Jesús Gutiérrez Vázquez con DNI 32869438T`, 10, 154);
      doc.text(`Fecha de emisión: ${this.currentDate}`, 10, 160);

      const firma = new Image();
      firma.src = 'assets/FirmaSello-SinFondo.png';
      firma.onload = () => {
        doc.addImage(firma, 'PNG', 10, 170, 50, 50); // Ajusta las coordenadas y el tamaño según tus necesidades
        doc.text(`Firma del trabajador ${NombreApellidos}:`, 95, 175);
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 0, 0);
        doc.rect(95, 180, 80, 40);

        doc.setFillColor(123, 125, 116);
        doc.rect(10, 230, 190, 1, 'F'); // Rectángulo lleno

        doc.setFont("helvetica", "bold");
        doc.text(`NOTA: `, 10, 240);
        // Volver a la fuente normal
        doc.setFont("helvetica", "normal");
        doc.text(`Esta notificación ha sido expuesta durante la jornada laboral del trabajador.`, 25, 240);

        doc.setFillColor(112, 173, 71); // Color #70ad47
        doc.rect(10, 280, 190, 4, 'F'); // Rectángulo lleno

        // Guardar el PDF
        doc.save(NombreApellidos+'_datos_usuario.pdf');
      };
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

  private getCurrentDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}