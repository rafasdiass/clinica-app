import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.page.html',
  styleUrls: ['./select-appointment.page.scss'],
})
export class SelectAppointmentPage implements OnInit {
  appointmentTypes: string[] = [];
  loading = true;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    // Obtem os tipos de agendamento do backend
    this.appointmentService.getAppointments().subscribe(
      (appointments) => {
        this.appointmentTypes = appointments.map((appt) => appt.type);
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao buscar os tipos de agendamento:', error);
        this.loading = false;
      }
    );
  }

  selectType(type: string): void {
    this.router.navigate(['/schedule-details'], { queryParams: { type } });
  }
}
