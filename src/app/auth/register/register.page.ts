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
} from '@ionic/angular';
import { UserService } from 'src/app/shared/services/user.service';
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
    private fb: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = {
        name: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phone,
        cpf: this.registerForm.value.cpf,
        password: this.registerForm.value.password,
      };

      this.userService.createUser(userData, { role: 'patient' }).subscribe({
        next: () => {
          this.successMessage = 'Cadastro realizado com sucesso!';
          this.errorMessage = null;
          this.registerForm.reset();
          this.navCtrl.navigateRoot('/login');
        },
        error: (err: unknown) => {
          console.error('Erro no cadastro:', err);
          this.errorMessage =
            'Ocorreu um erro ao realizar o cadastro. Tente novamente.';
        },
      });
    }
  }

  /**
   * Redireciona para a página de login.
   */
  goToLogin(): void {
    this.navCtrl.navigateForward('/login');
  }
}
