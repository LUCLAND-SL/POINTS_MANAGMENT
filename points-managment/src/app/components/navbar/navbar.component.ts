import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  welcomeMessage: string = '';

  constructor(private router: Router, private navbarService: NavbarService) {
    this.navbarService.welcomeMessage$.subscribe(message => {
      this.welcomeMessage = message;
    });

  }

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

  navigateToEmpalmadores() {
    this.router.navigate(['/empalmador']);
  }

}
