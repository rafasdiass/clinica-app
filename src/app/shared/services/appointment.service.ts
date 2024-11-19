import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsEndpoint = '/appointments';
  private doctorsEndpoint = '/doctors';
  private availableTimesEndpoint = '/available-times';

  constructor(private api: ApiService) {}

  /**
   * Obtém a lista de agendamentos do backend.
   * @returns Observable com a lista de agendamentos
   */
  getAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(this.appointmentsEndpoint);
  }

  /**
   * Obtém detalhes de um agendamento pelo ID.
   * @param appointmentId ID do agendamento
   * @returns Observable com os detalhes do agendamento
   */
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.api.get<Appointment>(
      `${this.appointmentsEndpoint}/${appointmentId}`
    );
  }

  /**
   * Adiciona um novo agendamento.
   * @param appointment Dados do novo agendamento
   * @returns Observable com o agendamento criado
   */
  addAppointment(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.api.post<Appointment>(this.appointmentsEndpoint, appointment);
  }

  /**
   * Remove um agendamento pelo ID.
   * @param appointmentId ID do agendamento a ser removido
   * @returns Observable vazio
   */
  deleteAppointment(appointmentId: string): Observable<void> {
    return this.api.delete<void>(
      `${this.appointmentsEndpoint}/${appointmentId}`
    );
  }

  /**
   * Obtém a lista de médicos disponíveis.
   * @returns Observable com a lista de médicos
   */
  getDoctors(): Observable<{ name: string; specialty: string }[]> {
    return this.api.get<{ name: string; specialty: string }[]>(
      this.doctorsEndpoint
    );
  }

  /**
   * Obtém as datas disponíveis para um médico específico.
   * @param doctorName Nome do médico
   * @returns Observable com a lista de datas disponíveis
   */
  getAvailableDates(doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/dates`, {
      params: { doctor: doctorName },
    });
  }

  /**
   * Obtém os horários disponíveis para uma data e médico específicos.
   * @param date Data do agendamento
   * @param doctorName Nome do médico
   * @returns Observable com a lista de horários disponíveis
   */
  getAvailableTimes(date: string, doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/times`, {
      params: { date, doctor: doctorName },
    });
  }
}
