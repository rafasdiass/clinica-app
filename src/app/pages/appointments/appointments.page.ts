import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonicModule,
  AlertController,
} from '@ionic/angular';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AppointmentsPage implements OnInit {
  appointments: Appointment[] = []; // Lista de agendamentos tipada

  constructor(
    private appointmentService: AppointmentService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  /**
   * Carrega os agendamentos do backend.
   */
  private loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data: Appointment[]) => {
        console.log('Agendamentos carregados:', data);
        this.appointments = data;
      },
      error: (err) => {
        console.error('Erro ao carregar agendamentos:', err);
        this.showErrorAlert();
      },
    });
  }

  /**
   * Exibe um alerta de erro ao carregar agendamentos.
   */
  private async showErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Erro',
      message:
        'Não foi possível carregar seus agendamentos. Tente novamente mais tarde.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
