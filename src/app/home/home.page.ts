import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FooterPage } from '../pages/footer/footer.page';
import { ScheduleAppointmentPage } from "../pages/schedule-appointment/schedule-appointment.page";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [HeaderComponent, IonicModule, FooterPage, ScheduleAppointmentPage], // Importa o HeaderComponent standalone
})
export class HomePage {}
