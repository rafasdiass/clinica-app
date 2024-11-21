import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectAppointmentPage } from './select-appointment/select-appointment.page';
import { ScheduleDetailsPage } from './schedule-details/schedule-details.page';
import { DatePickerPage } from '../date-picker/date-picker.page';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.page.html',
  styleUrls: ['./schedule-appointment.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectAppointmentPage,
    ScheduleDetailsPage,
    DatePickerPage,
    IonicModule,
  ],
})
export class ScheduleAppointmentPage {
  appointmentType: string | null = null;
  selectedDoctor: string | null = null;
  selectedDate: string | null = null;
  availableDates: string[] = [];

  onTypeSelected(type: string): void {
    this.appointmentType = type;
  }

  onDoctorSelected(doctor: string): void {
    this.selectedDoctor = doctor;

    // Simula datas do backend (substituir futuramente)
    this.availableDates = ['2023-11-22', '2023-11-23', '2023-11-24'];
  }

  onDateSelected(date: string): void {
    this.selectedDate = date;
  }

  onDetailsUpdated(details: {
    doctor: string;
    date: string;
    time: string;
  }): void {
    this.selectedDoctor = details.doctor;
    this.selectedDate = details.date;
  }

  confirmAppointment(): void {
    if (this.selectedDoctor && this.selectedDate && this.appointmentType) {
      console.log('Agendamento confirmado:', {
        doctor: this.selectedDoctor,
        date: this.selectedDate,
        type: this.appointmentType,
      });
    } else {
      console.error('Preencha todos os campos antes de confirmar.');
    }
  }
}
