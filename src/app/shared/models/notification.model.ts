export interface Notification {
  id: string;
  message: string;
  appointmentId?: string;
  examId?: string;
  sentAt: string;
}
