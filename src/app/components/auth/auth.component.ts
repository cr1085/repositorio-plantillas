import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent{

  @Output() authSuccess = new EventEmitter<void>();

  showLoginModal = false;
  showRegisterModal = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Definimos los formularios reactivos
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Mostrar y ocultar modales
  openLogin() {
    this.showLoginModal = true;
    this.showRegisterModal = false;
  }

  openRegister() {
    this.showRegisterModal = true;
    this.showLoginModal = false;
  }

  // Métodos para el Login
  onLogin(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.showLoginModal = false;
          this.authSuccess.emit();
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    }
  }

  // Métodos para el Registro
  onRegister(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        () => {
          this.showRegisterModal = false;
          this.openLogin();
        },
        (error) => {
          console.error('Error al registrarse:', error);
        }
      );
    }
  }

  switchToRegister() {
    this.openRegister();
  }

  switchToLogin() {
    this.openLogin();
  }

}
