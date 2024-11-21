import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { Doctor } from 'src/app/shared/models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseEndpoint = '/appointments';
  private doctorsEndpoint = '/doctors';
  private availableTimesEndpoint = '/available-times';
  private appointmentTypesEndpoint = '/appointment-types';

  constructor(private api: ApiService) {}

  /**
   * Obtém todos os agendamentos.
   */
  getAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(this.baseEndpoint);
  }

  /**
   * Obtém um agendamento específico por ID.
   */
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.api.get<Appointment>(`${this.baseEndpoint}/${appointmentId}`);
  }

  /**
   * Atualiza um agendamento.
   */
  updateAppointment(
    appointmentId: string,
    updatedAppointment: Partial<Appointment>
  ): Observable<{ success: boolean }> {
    return this.api.put<{ success: boolean }>(
      `${this.baseEndpoint}/${appointmentId}`,
      updatedAppointment
    );
  }

  /**
   * Exclui um agendamento.
   */
  deleteAppointment(appointmentId: string): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(
      `${this.baseEndpoint}/${appointmentId}`
    );
  }

  /**
   * Obtém os tipos de atendimento.
   */
  getAppointmentTypes(): Observable<string[]> {
    return this.api.get<string[]>(this.appointmentTypesEndpoint);
  }

  /**
   * Obtém todos os médicos.
   */
  getDoctors(): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(this.doctorsEndpoint);
  }

  /**
   * Obtém datas disponíveis para um médico.
   */
  getAvailableDatesForDoctor(doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/dates`, {
      params: { doctor: doctorName },
    });
  }

  /**
   * Obtém médicos disponíveis para uma data específica.
   */
  getDoctorsByDate(date: string): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(`${this.availableTimesEndpoint}/doctors`, {
      params: { date },
    });
  }

  /**
   * Valida a disponibilidade de uma combinação de médico, data e horário.
   */
  validateAvailability(
    doctorName: string,
    date: string,
    time: string
  ): Observable<{ available: boolean }> {
    return this.api.get<{ available: boolean }>(
      `${this.availableTimesEndpoint}/validate`,
      {
        params: { doctor: doctorName, date, time },
      }
    );
  }

  /**
   * Obtém datas disponíveis para um médico.
   */
  getAvailableDates(doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/dates`, {
      params: { doctor: doctorName },
    });
  }
  /**
   * Obtém horários disponíveis para um médico em uma data específica.
   * @param date Data selecionada.
   * @param doctorName Nome do médico.
   * @returns Lista de horários disponíveis.
   */
  getAvailableTimes(date: string, doctorName: string): Observable<string[]> {
    return this.api.get<string[]>(`${this.availableTimesEndpoint}/times`, {
      params: { date, doctor: doctorName },
    });
  }
}
