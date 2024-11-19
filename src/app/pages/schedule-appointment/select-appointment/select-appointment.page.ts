import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { catchError, of } from 'rxjs';
import {
  IonList,
  IonItem,
  IonLabel,
  IonDatetime,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.page.html',
  styleUrls: ['./select-appointment.page.scss'],
  standalone: true,
  imports: [IonDatetime, IonLabel, IonItem, IonList, CommonModule],
})
export class SelectAppointmentPage implements OnInit {
  @Input() selectedType: string | null = null;
  @Output() typeSelected = new EventEmitter<string>();
  @Output() doctorSelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<string>();

  appointmentTypes: string[] = [];
  doctors: Doctor[] = [];
  availableDates: string[] = [];
  disabledDates: string[] = []; // Lista de datas desabilitadas no DatePicker
  selectedDate: string | null = null; // Propriedade corrigida
  selectedDoctor: string | null = null; // Médico selecionado
  isDateValid = true; // Propriedade corrigida para validação de datas

  loadingTypes = true;
  loadingDoctors = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointmentTypes();
    this.loadDoctors();
  }

  loadAppointmentTypes(): void {
    this.appointmentService
      .getAppointmentTypes()
      .pipe(catchError(() => of([])))
      .subscribe((types) => {
        this.appointmentTypes = types;
        this.loadingTypes = false;
      });
  }

  loadDoctors(): void {
    this.loadingDoctors = true;
    this.appointmentService
      .getDoctors()
      .pipe(catchError(() => of([])))
      .subscribe((doctors) => {
        this.doctors = doctors;
        this.loadingDoctors = false;
      });
  }

  selectType(type: string): void {
    this.typeSelected.emit(type);
  }

  selectDoctor(doctor: string): void {
    this.selectedDoctor = doctor;
    this.doctorSelected.emit(doctor);

    // Carregar as datas disponíveis para o médico selecionado
    this.appointmentService
      .getAvailableDates(doctor)
      .pipe(catchError(() => of([])))
      .subscribe((dates) => {
        this.availableDates = dates;
        this.updateDisabledDates(); // Atualizar datas desabilitadas
      });
  }

  updateDisabledDates(): void {
    // Supondo que "availableDates" contenha as datas disponíveis
    const allDates = this.getMonthDates();
    this.disabledDates = allDates.filter(
      (date) => !this.availableDates.includes(date)
    );
  }

  onDateChange(event: any): void {
    const selectedDate = event.detail.value?.split('T')[0]; // Normalizar a data
    this.isDateValid = this.availableDates.includes(selectedDate);

    if (this.isDateValid) {
      this.selectedDate = selectedDate;
      this.dateSelected.emit(selectedDate);
    } else {
      console.warn('Data indisponível:', selectedDate);
    }
  }

  getMonthDates(): string[] {
    // Gerar todas as datas do mês atual
    const dates: string[] = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dates.push(date.toISOString().split('T')[0]); // Formato "YYYY-MM-DD"
    }

    return dates;
  }
}
