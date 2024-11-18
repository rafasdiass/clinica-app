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
   * Obtém a lista de consultas.
   */
  getAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(this.appointmentsEndpoint);
  }

  /**
   * Obtém detalhes de uma consulta pelo ID.
   */
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.api.get<Appointment>(
      `${this.appointmentsEndpoint}/${appointmentId}`
    );
  }

  /**
   * Adiciona uma nova consulta.
   */
  addAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.api.post<Appointment>(this.appointmentsEndpoint, appointment);
  }

  /**
   * Remove uma consulta pelo ID.
   */
  deleteAppointment(appointmentId: string): Observable<void> {
    return this.api.delete<void>(
      `${this.appointmentsEndpoint}/${appointmentId}`
    );
  }
}
