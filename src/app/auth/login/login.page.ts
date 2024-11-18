import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passwordVisible = false; // Propriedade para controle da visibilidade da senha

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  /**
   * Realiza login e valida o formulário.
   */
  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: async (response) => {
          localStorage.setItem('token', response.accessToken);
          await this.showToast('Login realizado com sucesso!', 'success');
          this.navCtrl.navigateRoot('/home'); // Redireciona para a página inicial
        },
        error: async () => {
          await this.showToast(
            'Credenciais inválidas. Tente novamente.',
            'danger'
          );
        },
      });
    } else {
      this.showToast('Preencha todos os campos corretamente.', 'warning');
    }
  }

  /**
   * Alterna a visibilidade do campo de senha.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Exibe uma mensagem de Toast.
   */
  private async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  /**
   * Navega para a página de registro.
   */
  goToRegister(): void {
    this.navCtrl.navigateForward('/register');
  }
}
