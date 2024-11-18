import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsEndpoint = '/appointments';

  constructor(private api: ApiService) {}

  /**
   * Obtém a lista de agendamentos do backend.
   */
  getAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(this.appointmentsEndpoint);
  }

  /**
   * Obtém detalhes de um agendamento pelo ID.
   */
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.api.get<Appointment>(
      `${this.appointmentsEndpoint}/${appointmentId}`
    );
  }

  /**
   * Adiciona um novo agendamento.
   */
  addAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.api.post<Appointment>(this.appointmentsEndpoint, appointment);
  }

  /**
   * Remove um agendamento pelo ID.
   */
  deleteAppointment(appointmentId: string): Observable<void> {
    return this.api.delete<void>(
      `${this.appointmentsEndpoint}/${appointmentId}`
    );
  }
}
