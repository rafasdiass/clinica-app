import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Importa o arquivo de configuração
import { registerIcons } from './app/icons';

// Registrar os ícones
registerIcons();

// Inicializar a aplicação com a configuração do appConfig
bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error('Erro ao inicializar a aplicação:', err);
});
