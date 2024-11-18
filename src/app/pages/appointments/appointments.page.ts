import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonicModule } from '@ionic/angular';

interface Appointment {
  doctorName: string;
  specialty: string;
  date: string;
  location: string;
  notes: string;
  photoUrl: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class AppointmentsPage implements OnInit {
  appointments: Appointment[] = []; // Lista de agendamentos tipada

  constructor() {}

  ngOnInit() {
    this.loadAppointments();
  }

  /**
   * Carrega agendamentos mockados (dados simulados).
   */
  private loadAppointments(): void {
    this.appointments = [
      {
        doctorName: 'Dra. Ana Silva',
        specialty: 'Oftalmologista',
        date: '25/11/2023 - 10:00 AM',
        location: 'Sala 203, Clínica Central',
        notes: 'Traga exames anteriores',
        photoUrl: 'assets/imgs/doctor-ana.jpg',
      },
      {
        doctorName: 'Dr. João Santos',
        specialty: 'Oftalmologista',
        date: '30/11/2023 - 14:00',
        location: 'Sala 405, Clínica Sul',
        notes: 'Jejum de 8 horas necessário',
        photoUrl: 'assets/imgs/doctor-joao.jpg',
      },
    ];
  }
}
