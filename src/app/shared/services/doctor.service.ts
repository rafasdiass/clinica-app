import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Doctor, Schedule } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorEndpoint = '/doctors';

  constructor(private api: ApiService) {}

  /**
   * Obtém a lista de médicos.
   */
  getDoctors(): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(`${this.doctorEndpoint}`);
  }

  /**
   * Adiciona um novo médico.
   */
  addDoctor(doctor: Partial<Doctor>): Observable<Doctor> {
    return this.api.post<Doctor>(`${this.doctorEndpoint}`, doctor);
  }

  /**
   * Atualiza os dados de um médico existente.
   */
  updateDoctor(doctorId: string, doctor: Partial<Doctor>): Observable<void> {
    return this.api.put<void>(`${this.doctorEndpoint}/${doctorId}`, doctor);
  }

  /**
   * Remove um médico.
   */
  deleteDoctor(doctorId: string): Observable<void> {
    return this.api.delete<void>(`${this.doctorEndpoint}/${doctorId}`);
  }

  /**
   * Adiciona um horário à agenda de um médico.
   */
  addSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.api.post<void>(
      `${this.doctorEndpoint}/${doctorId}/schedule`,
      schedule
    );
  }

  /**
   * Remove um horário da agenda de um médico.
   */
  removeSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.api.request<void>(
      'delete',
      `${this.doctorEndpoint}/${doctorId}/schedule`,
      {
        body: schedule,
      }
    );
  }

  /**
   * Bloqueia um horário específico na agenda de um médico.
   */
  blockSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.api.post<void>(
      `${this.doctorEndpoint}/${doctorId}/block-schedule`,
      schedule
    );
  }

  /**
   * Gera intervalos de horários baseados em configurações.
   */
  generateTimeSlots(
    startTime: string,
    endTime: string,
    consultationDuration: number,
    breakDuration: number
  ): string[] {
    const slots: string[] = [];
    let current = this.parseTime(startTime);
    const end = this.parseTime(endTime);

    while (current < end) {
      const nextSlot = new Date(
        current.getTime() + consultationDuration * 60000
      );
      slots.push(this.formatTime(current));
      current = new Date(nextSlot.getTime() + breakDuration * 60000);
    }

    return slots;
  }

  /**
   * Converte uma string de horário para um objeto Date.
   */
  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  /**
   * Formata um objeto Date para string de horário.
   */
  private formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }
}
