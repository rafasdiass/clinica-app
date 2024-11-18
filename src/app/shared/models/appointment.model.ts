export interface Appointment {
  doctorName: string;
  specialty: string;
  date: string; // Pode ser ajustado para `Date` se necessário
  location: string;
  notes: string;
  photoUrl: string;
}
