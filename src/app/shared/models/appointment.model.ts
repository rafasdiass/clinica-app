export interface Appointment {
  id?: string; // ID opcional
  type: string; // Tipo de atendimento
  doctorName: string;
  specialty: string;
  date: string; // Formato ISO
  availableTimes: string[]; // Lista de horários disponíveis
  location: string;
  notes?: string; // Notas opcionais
}
