import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private welcomeMessageSubject = new BehaviorSubject<string>('');
  welcomeMessage$ = this.welcomeMessageSubject.asObservable();
  

  setWelcomeMessage(message: string) {
    this.welcomeMessageSubject.next(message);
  }
}