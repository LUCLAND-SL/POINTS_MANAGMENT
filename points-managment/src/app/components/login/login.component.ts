import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from '../navbar/navbar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private navbarService: NavbarService, private router: Router) {}

  onSubmit() {
    this.http.get('assets/PuntosTrabajadores2024.xlsx', { responseType: 'arraybuffer' }).subscribe(data => {
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      const worksheet = workbook.Sheets['Login'];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const user = jsonData.find((row: any[]) => row[1] === this.username && row[2] === this.password);

      if (user) {
        this.navbarService.setWelcomeMessage(`Bienvenido ${user[0]}`);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Tu usuario no tiene permiso para loguearse';
      }
    });
  }
  
}
