export interface Doctor {
  id: string;
  name: string;
  crm: string;
  specialty: string;
  schedule: Schedule[];
}

export interface Schedule {
  day: string;
  schedules: string[]; // Lista de horários disponíveis
}
