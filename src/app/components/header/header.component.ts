import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // Define como standalone
  imports: [IonicModule], // Você pode adicionar módulos aqui caso necessário, como CommonModule
})
export class HeaderComponent {
  title: string = 'Clínicas de Olhos';
  subtitle: string = 'Bem-vindo, Paciente!';

  constructor() {}
}
