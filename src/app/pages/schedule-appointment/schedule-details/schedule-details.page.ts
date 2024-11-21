import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { catchError, of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.page.html',
  styleUrls: ['./schedule-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ScheduleDetailsPage implements OnInit {
  @Input() doctorName: string | null = null; // Nome do médico
  @Input() date: string | null = null; // Data selecionada
  @Output() detailsUpdated = new EventEmitter<{
    doctor: string;
    date: string;
    time: string;
  }>();

  availableTimes: string[] = []; // Horários disponíveis
  loadingTimes = false; // Estado de carregamento

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAvailableTimes();
  }

  /**
   * Carrega horários disponíveis para o médico e a data selecionados.
   */
  private loadAvailableTimes(): void {
    if (!this.doctorName || !this.date) return;

    this.loadingTimes = true;
    this.appointmentService
      .getAvailableTimes(this.date, this.doctorName)
      .pipe(catchError(() => of([])))
      .subscribe((times) => {
        this.availableTimes = times;
        this.loadingTimes = false;
      });
  }

  /**
   * Atualiza os detalhes do agendamento com o horário selecionado.
   * @param time Horário selecionado.
   */
  updateDetails(time: string): void {
    if (this.doctorName && this.date) {
      this.detailsUpdated.emit({
        doctor: this.doctorName,
        date: this.date,
        time,
      });
    }
  }
}
