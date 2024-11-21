import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { catchError, of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.page.html',
  styleUrls: ['./select-appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SelectAppointmentPage implements OnInit {
  filterMode: 'date' | 'doctor' = 'date';
  availableDoctors: Doctor[] = [];
  selectedDate: string | null = null;

  @Output() typeSelected = new EventEmitter<string>();
  @Output() doctorSelected = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  private loadDoctors(): void {
    this.appointmentService
      .getDoctors()
      .pipe(catchError(() => of([])))
      .subscribe((doctors) => {
        this.availableDoctors = doctors;
      });
  }

  onDoctorSelect(doctorName: string): void {
    this.doctorSelected.emit(doctorName);
  }
}
