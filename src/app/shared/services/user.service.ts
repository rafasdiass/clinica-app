import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../models/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userEndpoint = '/users';
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(private api: ApiService) {}

  /**
   * Cria um novo usuário.
   */
  createUser(
    userAuth: Partial<UserData>,
    additionalData: Partial<UserData>
  ): Observable<UserData> {
    const userData = { ...userAuth, ...additionalData };
    return this.api.post<UserData>(`${this.userEndpoint}/register`, userData);
  }

  /**
   * Obtém informações do perfil do usuário.
   */
  getUserProfile(): Observable<UserData> {
    return this.api.get<UserData>(`${this.userEndpoint}/profile`);
  }

  /**
   * Atualiza informações do perfil do usuário.
   */
  updateUserProfile(data: Partial<UserData>): Observable<void> {
    return this.api.put<void>(`${this.userEndpoint}/profile`, data);
  }

  /**
   * Define dados do usuário localmente.
   */
  setUserData(userData: UserData): void {
    this.userDataSubject.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  /**
   * Retorna dados do usuário localmente.
   */
  getUserData(): UserData | null {
    return this.userDataSubject.value;
  }

  /**
   * Limpa os dados do usuário localmente.
   */
  clearUserData(): void {
    this.userDataSubject.next(null);
    localStorage.removeItem('userData');
  }
}
