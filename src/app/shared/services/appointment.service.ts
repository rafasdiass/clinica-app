import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsEndpoint = '/appointments';
  private doctorsEndpoint = '/doctors';
  private availableTimesEndpoint = '/available-times';
  private appointmentTypesEndpoint = '/appointment-types'; // Endpoint para tipos de atendimento

  constructor(private api: ApiService) {}

  // Retorna os agendamentos
  getAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(this.appointmentsEndpoint);
  }

  // Obtém os tipos de atendimento do backend
  getAppointmentTypes(): Observable<string[]> {
    return this.api.get<string[]>(this.appointmentTypesEndpoint);
  }

  // Retorna os médicos
  getDoctors(): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(this.doctorsEndpoint);
  }

  // Datas disponíveis por médico
  getAvailableDates(doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/dates`, {
      params: { doctor: doctorName },
    });
  }

  // Horários disponíveis para médico e data
  getAvailableTimes(date: string, doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/times`, {
      params: { date, doctor: doctorName },
    });
  }

  // Cria um agendamento
  createAppointment(
    appointment: Partial<Appointment>
  ): Observable<{ success: boolean }> {
    return this.api.post<{ success: boolean }>(
      this.appointmentsEndpoint,
      appointment
    );
  }
}
