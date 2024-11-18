import { Appointment } from './appointment.model';
import { Exam } from './exam.model';

export interface Patient {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  phone: string;
  appointmentHistory: Appointment[];
  examHistory: Exam[];
}
