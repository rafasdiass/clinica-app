import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.page.html',
  styleUrls: ['./schedule-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ScheduleDetailsPage implements OnInit {
  @Input() appointmentType: string | null = null;
  @Input() selectedDoctor: string | null = null; // Propriedade adicionada
  @Input() selectedDate: string | null = null; // Propriedade adicionada
  @Output() detailsUpdated = new EventEmitter<{
    doctor: string;
    date: string;
  }>();

  availableTimes: string[] = [];
  loadingTimes = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    if (this.selectedDoctor && this.selectedDate) {
      this.loadAvailableTimes(this.selectedDoctor, this.selectedDate);
    }
  }

  /**
   * Carrega os horários disponíveis para o médico e a data selecionados.
   */
  loadAvailableTimes(doctor: string, date: string): void {
    this.loadingTimes = true;
    this.appointmentService
      .getAvailableTimes(date, doctor)
      .pipe(
        catchError((error) => {
          console.error('Erro ao carregar horários disponíveis:', error);
          return of([]);
        })
      )
      .subscribe((times) => {
        this.availableTimes = times;
        this.loadingTimes = false;
      });
  }

  /**
   * Atualiza os detalhes selecionados.
   */
  updateDetails(time: string): void {
    if (this.selectedDoctor && this.selectedDate) {
      this.detailsUpdated.emit({
        doctor: this.selectedDoctor,
        date: time,
      });
    }
  }
}
