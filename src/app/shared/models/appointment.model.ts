export interface Appointment {
  id: string;
  fullName: string;
  birthDate: string;
  cpf: string;
  phone: string;
  email: string;
  appointmentType: 'Clínico' | 'DETRAN';
  date: string;
  time: string;
}
