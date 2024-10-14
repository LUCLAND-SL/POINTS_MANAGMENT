import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToHistorico() {
    this.router.navigate(['/historico']);
  }

  navigateToNormas() {
    this.router.navigate(['/normas']);
  }

}
