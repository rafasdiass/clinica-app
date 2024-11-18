import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { UserData } from '../models/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userEndpoint = 'users';
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(private api: ApiService) {}

  /**
   * Cria um novo usuário.
   * @param user Dados do usuário para o registro.
   * @returns Observable contendo os dados do usuário criado.
   */
  createUser(user: UserData): Observable<UserData> {
    console.log(
      'UserService: Enviando dados de registro para o endpoint:',
      user
    );

    return this.api.post<UserData>(`${this.userEndpoint}/register`, user).pipe(
      tap((response) =>
        console.log(
          'UserService: Resposta do servidor ao criar usuário:',
          response
        )
      ),
      catchError((error) => {
        console.error('UserService: Erro ao criar usuário:', error);
        return of(error); // Retorna o erro como observable para não interromper o fluxo.
      })
    );
  }

  /**
   * Obtém informações do perfil do usuário atual.
   * @returns Observable contendo os dados do perfil do usuário.
   */
  getUserProfile(): Observable<UserData> {
    console.log('UserService: Solicitando perfil do usuário.');

    return this.api.get<UserData>(`${this.userEndpoint}/profile`).pipe(
      tap((response) =>
        console.log('UserService: Perfil do usuário obtido:', response)
      ),
      catchError((error) => {
        console.error('UserService: Erro ao obter perfil do usuário:', error);
        return of(error);
      })
    );
  }

  /**
   * Atualiza informações do perfil do usuário.
   * @param data Dados parciais do perfil a serem atualizados.
   * @returns Observable vazio ao concluir a operação.
   */
  updateUserProfile(data: Partial<UserData>): Observable<void> {
    console.log(
      'UserService: Enviando atualização de perfil com os seguintes dados:',
      data
    );

    return this.api.put<void>(`${this.userEndpoint}/profile`, data).pipe(
      tap(() => console.log('UserService: Perfil atualizado com sucesso.')),
      catchError((error) => {
        console.error('UserService: Erro ao atualizar perfil:', error);
        return of(error);
      })
    );
  }

  /**
   * Armazena os dados do usuário localmente e notifica observadores.
   * @param userData Dados do usuário a serem armazenados.
   */
  setUserData(userData: UserData): void {
    console.log(
      'UserService: Armazenando dados do usuário localmente:',
      userData
    );

    this.userDataSubject.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  /**
   * Obtém os dados armazenados localmente do usuário.
   * @returns Dados do usuário ou `null` se não existirem.
   */
  getUserData(): UserData | null {
    const userData = this.userDataSubject.value;
    console.log('UserService: Obtendo dados armazenados do usuário:', userData);

    return userData;
  }

  /**
   * Remove os dados do usuário armazenados localmente e notifica observadores.
   */
  clearUserData(): void {
    console.log('UserService: Limpando dados do usuário localmente.');

    this.userDataSubject.next(null);
    localStorage.removeItem('userData');
  }
}
