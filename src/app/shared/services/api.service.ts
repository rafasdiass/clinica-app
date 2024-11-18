import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  /**
   * Realiza uma requisição GET.
   * @param endpoint - Caminho relativo ao `baseUrl`.
   * @param params - Parâmetros opcionais.
   * @param headers - Cabeçalhos opcionais.
   */
  get<T>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.get<T>(
      this.createUrl(endpoint),
      this.createOptions(params, headers)
    );
  }

  /**
   * Realiza uma requisição POST.
   * @param endpoint - Caminho relativo ao `baseUrl`.
   * @param body - Dados enviados no corpo da requisição.
   * @param headers - Cabeçalhos opcionais.
   */
  post<T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.post<T>(
      this.createUrl(endpoint),
      body,
      this.createOptions(undefined, headers)
    );
  }

  /**
   * Realiza uma requisição PUT.
   * @param endpoint - Caminho relativo ao `baseUrl`.
   * @param body - Dados enviados no corpo da requisição.
   * @param headers - Cabeçalhos opcionais.
   */
  put<T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.put<T>(
      this.createUrl(endpoint),
      body,
      this.createOptions(undefined, headers)
    );
  }

  /**
   * Realiza uma requisição DELETE.
   * @param endpoint - Caminho relativo ao `baseUrl`.
   * @param params - Parâmetros opcionais.
   * @param headers - Cabeçalhos opcionais.
   */
  delete<T>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Observable<T> {
    return this.http.delete<T>(
      this.createUrl(endpoint),
      this.createOptions(params, headers)
    );
  }

  /**
   * Realiza uma requisição genérica.
   * @param method - Método HTTP (GET, POST, etc.).
   * @param endpoint - Caminho relativo ao `baseUrl`.
   * @param options - Configurações adicionais (body, params, headers).
   */
  request<T>(
    method: string,
    endpoint: string,
    options: {
      body?: any;
      params?: Record<string, any>;
      headers?: Record<string, string>;
    } = {}
  ): Observable<T> {
    const requestOptions = this.createOptions(
      options.params,
      options.headers,
      options.body
    );
    return this.http.request<T>(
      method,
      this.createUrl(endpoint),
      requestOptions
    );
  }

  /**
   * Cria o URL completo com base no `endpoint`.
   * @param endpoint - Caminho relativo.
   */
  private createUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Cria as opções da requisição (parâmetros, cabeçalhos e corpo).
   * @param params - Parâmetros opcionais.
   * @param headers - Cabeçalhos opcionais.
   * @param body - Corpo da requisição (opcional).
   */
  private createOptions(
    params?: Record<string, any>,
    headers?: Record<string, string>,
    body?: any
  ) {
    return {
      params: this.buildHttpParams(params),
      headers: this.buildHttpHeaders(headers),
      body,
    };
  }

  /**
   * Constrói os parâmetros de requisição.
   * @param params - Parâmetros opcionais.
   */
  private buildHttpParams(
    params?: Record<string, any>
  ): HttpParams | undefined {
    return params ? new HttpParams({ fromObject: params }) : undefined;
  }

  /**
   * Constrói os cabeçalhos de requisição.
   * @param headers - Cabeçalhos opcionais.
   */
  private buildHttpHeaders(
    headers?: Record<string, string>
  ): HttpHeaders | undefined {
    return headers ? new HttpHeaders(headers) : undefined;
  }
}
