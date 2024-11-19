import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.page.html',
  styleUrls: ['./select-appointment.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SelectAppointmentPage implements OnInit {
  @Input() selectedType: string | null = null;
  @Output() typeSelected = new EventEmitter<string>();
  @Output() doctorSelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<string>();

  appointmentTypes: string[] = [];
  doctors: Doctor[] = [];
  availableDates: string[] = [];
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
    this.doctorSelected.emit(doctor);
  }

  selectDate(date: string): void {
    this.dateSelected.emit(date);
  }
}
