import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  NavController,
  AlertController,
} from '@ionic/angular';
import { UserService } from 'src/app/shared/services/user.service';
import { UserData } from 'src/app/shared/models/app-user.model';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class RegisterPage {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navigationController: NavController,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        isActive: [true], // Padrão como ativo
      },
      { validators: this.passwordMatchValidator }
    );
    console.log(
      'RegisterPage inicializada com formulário:',
      this.registerForm.value
    );
  }

  /**
   * Valida se os campos de senha e confirmação de senha coincidem.
   */
  private passwordMatchValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const result = password === confirmPassword ? null : { mismatch: true };
    console.log('Validando senhas:', { password, confirmPassword, result });
    return result;
  }

  /**
   * Método acionado ao submeter o formulário.
   */
  async onSubmit(): Promise<void> {
    console.log('Iniciando submissão do formulário...');
    if (this.registerForm.valid) {
      const userData: UserData = this.registerForm.value;

      console.log(
        'Formulário válido. Dados enviados para o servidor:',
        userData
      );

      this.userService.createUser(userData).subscribe({
        next: async (response) => {
          console.log('Resposta bem-sucedida do servidor:', response);

          // Exibe o alerta de sucesso
          await this.showSuccessAlert();

          this.successMessage = 'Cadastro realizado com sucesso!';
          this.errorMessage = null;
          console.log('Redefinindo o formulário...');
          this.registerForm.reset();
          console.log('Navegando para a página de login...');
          this.navigationController.navigateRoot('/login');
        },
        error: async (error) => {
          console.error('Erro ao realizar o cadastro:', error);

          // Exibe o alerta de erro
          await this.showErrorAlert();
          this.errorMessage =
            'Houve um problema ao realizar o cadastro. Por favor, tente novamente.';
        },
      });
    } else {
      console.warn('Formulário inválido:', this.registerForm.value);
    }
  }

  /**
   * Exibe um alerta de sucesso.
   */
  private async showSuccessAlert(): Promise<void> {
    console.log('Exibindo alerta de sucesso...');
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Seu cadastro foi realizado com sucesso.',
      buttons: ['OK'],
    });
    await alert.present();
    console.log('Alerta de sucesso exibido.');
  }

  /**
   * Exibe um alerta de erro.
   */
  private async showErrorAlert(): Promise<void> {
    console.log('Exibindo alerta de erro...');
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Não foi possível realizar o cadastro. Tente novamente.',
      buttons: ['OK'],
    });
    await alert.present();
    console.log('Alerta de erro exibido.');
  }

  /**
   * Navega para a página de login.
   */
  goToLogin(): void {
    console.log('Navegando para a página de login...');
    this.navigationController.navigateForward('/login');
  }
}
