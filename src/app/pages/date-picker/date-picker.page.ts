import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, DatetimeCustomEvent } from '@ionic/angular'; // Apenas `IonicModule`

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.page.html',
  styleUrls: ['./date-picker.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule], // Remove `IonDatetime` standalone
})
export class DatePickerPage {
  @Input() availableDates: string[] = []; // Lista de datas disponíveis
  @Output() dateSelected = new EventEmitter<string>(); // Evento de data selecionada

  /**
   * Método chamado quando uma data é selecionada.
   * @param event Evento emitido pelo IonDatetime.
   */
  onDateChange(event: DatetimeCustomEvent): void {
    const value = event.detail.value;

    if (typeof value === 'string') {
      const selectedDate = value.split('T')[0]; // Formato 'YYYY-MM-DD'
      this.dateSelected.emit(selectedDate); // Emite a data selecionada
    } else {
      console.warn('Valor inválido recebido do IonDatetime:', value);
    }
  }
}
