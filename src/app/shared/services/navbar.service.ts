import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private navbarState = new BehaviorSubject<boolean>(false); // Estado inicial fechado
  public isNavbarOpen = this.navbarState.asObservable(); // Exposição como observable

  toggleNavbar(): void {
    this.navbarState.next(!this.navbarState.value); // Alterna o estado
  }

  closeNavbar(): void {
    this.navbarState.next(false); // Fecha o menu
  }
}
