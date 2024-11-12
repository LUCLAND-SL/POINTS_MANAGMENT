import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  welcomeMessage: string = '';
  isMobile: boolean = false;
  isSidenavOpen: boolean = false;

  constructor(private router: Router, private navbarService: NavbarService) {
    this.navbarService.welcomeMessage$.subscribe(message => {
      this.welcomeMessage = message;
    });
  }

  toggleSidenav() { if (this.sidenav) { this.sidenav.toggle(); } } 
  
  onSidenavOpen() { this.isSidenavOpen = true; } 
  
  onSidenavClose() { this.isSidenavOpen = false; }
  
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

  navigateToHistoricoEmpalmadores() {
    this.router.navigate(['/historico-emp']);
  }
}
