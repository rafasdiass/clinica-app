export interface Appointment {
  id?: string; // ID do agendamento
  type: string; // Tipo de atendimento
  doctorName: string; // Nome do médico
  specialty: string; // Especialidade do médico
  date: string; // Data do agendamento
  availableTimes?: string[]; // Lista de horários disponíveis
}
