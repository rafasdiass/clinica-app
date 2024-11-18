import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private dashboardEndpoint = '/dashboard';
  private doctorsEndpoint = '/doctors';
  private appointmentsEndpoint = '/appointments';

  constructor(private api: ApiService) {}

  /**
   * Obtém estatísticas administrativas.
   */
  getStats(): Observable<Stats> {
    return this.api.get<Stats>(`${this.dashboardEndpoint}/summary`);
  }

  /**
   * Obtém a lista de médicos.
   */
  getDoctors(): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(this.doctorsEndpoint);
  }

  /**
   * Obtém as consultas de um médico específico.
   */
  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(
      `${this.appointmentsEndpoint}/by-doctor/${doctorId}`
    );
  }

  /**
   * Filtra consultas com base no status e período.
   */
  filterAppointmentsByStatusAndDate(
    status: string,
    startDate: string,
    endDate: string
  ): Observable<Appointment[]> {
    const params = { status, startDate, endDate };
    return this.api.get<Appointment[]>(
      `${this.appointmentsEndpoint}/filter`,
      params
    );
  }
}
