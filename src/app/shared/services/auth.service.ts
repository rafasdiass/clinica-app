import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authEndpoint = '/auth';

  constructor(private api: ApiService) {}

  /**
   * Realiza login do usuário.
   */
  login(email: string, password: string): Observable<any> {
    return this.api.post(`${this.authEndpoint}/login`, { email, password });
  }

  /**
   * Realiza logout do usuário.
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Verifica se o usuário está logado.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
