import { Component } from '@angular/core';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFooter,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    CommonModule,
    RouterModule,
  ],
})
export class FooterPage {
  constructor(private navigationService: NavigationService) {}

  navigateTo(route: string) {
    console.log('Navigating to:', route);
    this.navigationService.navigateToRoute(`/${route}`); // Corrigido para rotas adequadas
  }
}
