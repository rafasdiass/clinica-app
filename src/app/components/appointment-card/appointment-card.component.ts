import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
  standalone: true,
  imports: [],
})
export class AppointmentCardComponent {
  @Input() doctorName!: string;
  @Input() specialty!: string;
  @Input() date!: string;
  @Input() location!: string;
  @Input() notes!: string;
  @Input() photoUrl!: string;
}
