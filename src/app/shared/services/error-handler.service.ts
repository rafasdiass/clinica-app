import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Erro de conexão com o servidor. Verifique sua conexão.';
    } else if (error.status === 404) {
      return 'Recurso não encontrado.';
    } else {
      return `Erro inesperado: ${error.message}`;
    }
  }
}
