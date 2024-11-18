import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private examsEndpoint = '/exams';

  constructor(private api: ApiService) {}

  /**
   * Obtém a lista de exames.
   */
  getExams(): Observable<Exam[]> {
    return this.api.get<Exam[]>(this.examsEndpoint);
  }

  /**
   * Obtém detalhes de um exame pelo ID.
   */
  getExamById(examId: string): Observable<Exam> {
    return this.api.get<Exam>(`${this.examsEndpoint}/${examId}`);
  }

  /**
   * Adiciona um novo exame.
   */
  addExam(exam: Partial<Exam>): Observable<Exam> {
    return this.api.post<Exam>(this.examsEndpoint, exam);
  }

  /**
   * Remove um exame pelo ID.
   */
  deleteExam(examId: string): Observable<void> {
    return this.api.delete<void>(`${this.examsEndpoint}/${examId}`);
  }
}
