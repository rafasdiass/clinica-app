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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.page.html',
  styleUrls: ['./select-appointment.page.scss'],
  standalone: true,
  imports: [IonDatetime, IonLabel, IonItem, IonList, CommonModule,FormsModule],
})
export class SelectAppointmentPage implements OnInit {
  @Input() selectedType: string | null = null;
  @Output() typeSelected = new EventEmitter<string>();
  @Output() doctorSelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<string>();

  appointmentTypes: string[] = [];
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = []; // Lista de médicos filtrados
  availableDates: string[] = [];
  disabledDates: string[] = [];
  selectedDate: string | null = null;
  selectedDoctor: string | null = null;
  isDateValid = true;

  searchTerm: string = ''; // Termo de busca

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
        this.filteredDoctors = doctors; // Inicialmente todos os médicos estão disponíveis
        this.loadingDoctors = false;
      });
  }

  filterDoctors(): void {
    // Filtrar médicos com base no termo de busca
    const term = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term)
    );
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
        this.updateDisabledDates();
      });
  }

  updateDisabledDates(): void {
    const allDates = this.getMonthDates();
    this.disabledDates = allDates.filter(
      (date) => !this.availableDates.includes(date)
    );
  }

  onDateChange(event: any): void {
    const selectedDate = event.detail.value?.split('T')[0];
    this.isDateValid = this.availableDates.includes(selectedDate);

    if (this.isDateValid) {
      this.selectedDate = selectedDate;
      this.dateSelected.emit(selectedDate);
    } else {
      console.warn('Data indisponível:', selectedDate);
    }
  }

  getMonthDates(): string[] {
    const dates: string[] = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
  }
}
