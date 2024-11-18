import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patientEndpoint = '/patient';

  constructor(private api: ApiService) {}

  getPatientData(): Observable<Patient> {
    return this.api.get<Patient>(`${this.patientEndpoint}/profile`);
  }

  getAppointmentHistory(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(`${this.patientEndpoint}/appointments`);
  }

  updatePatientData(data: Partial<Patient>): Observable<void> {
    return this.api.put<void>(`${this.patientEndpoint}/profile`, data);
  }
}
