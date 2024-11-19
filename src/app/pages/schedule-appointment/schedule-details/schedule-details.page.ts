import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.page.html',
  styleUrls: ['./schedule-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ScheduleDetailsPage implements OnInit {
  appointmentType: string | null = null; // Tipo de atendimento selecionado
  selectedDate: string | null = null; // Data selecionada
  selectedDoctor: string | null = null; // Médico selecionado
  doctors: { name: string; specialty: string }[] = []; // Lista de médicos disponíveis para a data
  availableDates: string[] = []; // Datas disponíveis para o médico
  availableTimes: string[] = []; // Horários disponíveis
  loadingDoctors = false; // Estado de carregamento dos médicos
  loadingDates = false; // Estado de carregamento das datas
  loadingTimes = false; // Estado de carregamento dos horários
  errorMessage: string | null = null; // Mensagem de erro

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.appointmentType = params['type'];
    });
  }

  /**
   * Carrega médicos disponíveis para a data selecionada.
   */
  loadDoctorsByDate(): void {
    if (this.selectedDate) {
      this.loadingDoctors = true;
      this.appointmentService
        .getAppointments()
        .pipe(
          catchError((error) => {
            console.error('Erro ao buscar médicos disponíveis:', error);
            this.errorMessage =
              'Não foi possível carregar os médicos disponíveis para esta data.';
            this.loadingDoctors = false;
            return of([]);
          })
        )
        .subscribe((appointments) => {
          this.doctors = appointments
            .filter((appt) => appt.date === this.selectedDate)
            .map((appt) => ({
              name: appt.doctorName,
              specialty: appt.specialty,
            }));
          this.loadingDoctors = false;
        });
    }
  }

  /**
   * Carrega datas disponíveis para o médico selecionado.
   */
  loadDatesByDoctor(): void {
    if (this.selectedDoctor) {
      this.loadingDates = true;
      this.appointmentService
        .getAppointments()
        .pipe(
          catchError((error) => {
            console.error('Erro ao buscar datas disponíveis:', error);
            this.errorMessage =
              'Não foi possível carregar as datas disponíveis para este médico.';
            this.loadingDates = false;
            return of([]);
          })
        )
        .subscribe((appointments) => {
          this.availableDates = Array.from(
            new Set(
              appointments
                .filter((appt) => appt.doctorName === this.selectedDoctor)
                .map((appt) => appt.date)
            )
          );
          this.loadingDates = false;
        });
    }
  }

  /**
   * Carrega horários disponíveis para a data e médico selecionados.
   */
  loadAvailableTimes(): void {
    if (this.selectedDate && this.selectedDoctor) {
      this.loadingTimes = true;
      this.appointmentService
        .getAppointments()
        .pipe(
          catchError((error) => {
            console.error('Erro ao buscar horários disponíveis:', error);
            this.errorMessage =
              'Não foi possível carregar os horários disponíveis.';
            this.loadingTimes = false;
            return of([]);
          })
        )
        .subscribe((appointments) => {
          this.availableTimes = appointments
            .filter(
              (appt) =>
                appt.date === this.selectedDate &&
                appt.doctorName === this.selectedDoctor
            )
            .flatMap((appt) => appt.availableTimes || []);
          this.loadingTimes = false;
        });
    }
  }

  /**
   * Confirma o agendamento.
   */
  confirmAppointment(time: string): void {
    alert(`Agendamento confirmado para ${time}`);
    this.router.navigate(['/']);
  }
}
