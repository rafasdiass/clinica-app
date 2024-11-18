import { addIcons } from 'ionicons';
import {
  homeOutline,
  calendarOutline,
  personOutline,
  settingsOutline,
  searchOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  addOutline,
  removeOutline,
  eyeOutline, // Ícone de olho (visualizar senha)
  eyeOffOutline, // Ícone de olho com traço (ocultar senha)
  lockClosedOutline, // Ícone de cadeado fechado (senha)
  mailOutline, // Ícone de envelope (email)
  logInOutline, // Ícone de login (botão de login)
  personAddOutline, // Ícone de pessoa com "+" (registro de usuário)
  clipboardOutline, // Ícone de clipboard (dados de registro)
  callOutline, // Ícone de telefone
} from 'ionicons/icons';

export const registerIcons = () => {
  addIcons({
    'home-outline': homeOutline,
    'calendar-outline': calendarOutline,
    'person-outline': personOutline,
    'settings-outline': settingsOutline,
    'search-outline': searchOutline,
    'checkmark-circle-outline': checkmarkCircleOutline,
    'close-circle-outline': closeCircleOutline,
    'add-outline': addOutline,
    'remove-outline': removeOutline,
    'eye-outline': eyeOutline,
    'eye-off-outline': eyeOffOutline,
    'lock-closed-outline': lockClosedOutline,
    'mail-outline': mailOutline,
    'log-in-outline': logInOutline,
    'person-add-outline': personAddOutline, // Ícone para Registro
    'clipboard-outline': clipboardOutline, // Ícone para Dados de Registro
    'call-outline': callOutline, // Ícone de Telefone
  });
};
