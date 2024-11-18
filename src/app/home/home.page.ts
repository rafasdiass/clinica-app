import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FooterPage } from '../footer/footer.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, HeaderComponent, IonicModule, FooterPage], // Importa o HeaderComponent standalone
})
export class HomePage {}
