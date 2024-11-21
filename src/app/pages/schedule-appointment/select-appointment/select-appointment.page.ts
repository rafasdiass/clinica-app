import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.page.html',
  styleUrls: ['./select-appointment.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SelectAppointmentPage implements OnInit {
  availableDoctors: Doctor[] = []; // Lista de médicos carregados do backend
  filteredDoctors: Doctor[] = []; // Lista de médicos filtrados
  searchQuery: string = ''; // Texto de busca para filtro

  @Output() doctorSelected = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  /**
   * Carrega os médicos disponíveis do backend.
   */
  private loadDoctors(): void {
    this.appointmentService
      .getDoctors()
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar médicos:', error);
          return of([]);
        })
      )
      .subscribe((doctors) => {
        this.availableDoctors = doctors;
        this.filteredDoctors = doctors; // Inicializa a lista filtrada
      });
  }

  /**
   * Filtra médicos com base no texto de busca.
   */
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredDoctors = this.availableDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query)
    );
  }

  /**
   * Seleciona um médico e emite o evento para o componente pai.
   * @param doctorName Nome do médico selecionado.
   */
  onDoctorSelect(doctorName: string): void {
    this.doctorSelected.emit(doctorName);
  }
}
