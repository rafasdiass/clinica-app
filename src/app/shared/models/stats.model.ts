export interface Stats {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalRevenue?: number; // Campo opcional, se não estiver disponível
  completedAppointments?: number; // Campo opcional
  canceledAppointments?: number; // Campo opcional
}
