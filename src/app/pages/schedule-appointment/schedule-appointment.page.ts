import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectAppointmentPage } from './select-appointment/select-appointment.page';
import { ScheduleDetailsPage } from './schedule-details/schedule-details.page';
import { IonButton } from '@ionic/angular/standalone';
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
    IonicModule,
  ],
})
export class ScheduleAppointmentPage {
  appointmentType: string | null = null; // Tipo de atendimento selecionado
  selectedDoctor: string | null = null; // Médico selecionado
  selectedDate: string | null = null; // Data selecionada

  /**
   * Atualiza o tipo de agendamento selecionado pelo componente filho.
   */
  onTypeSelected(type: string): void {
    this.appointmentType = type;
  }

  /**
   * Atualiza as informações detalhadas de agendamento pelo componente filho.
   */
  onDetailsUpdated(details: { doctor: string; date: string }): void {
    this.selectedDoctor = details.doctor;
    this.selectedDate = details.date;
  }

  /**
   * Confirma o agendamento.
   */
  confirmAppointment(): void {
    if (this.selectedDoctor && this.selectedDate) {
      console.log('Agendamento confirmado:', {
        doctor: this.selectedDoctor,
        date: this.selectedDate,
        type: this.appointmentType,
      });
    } else {
      console.error('Selecione um médico, uma data e um tipo de atendimento.');
    }
  }
}
