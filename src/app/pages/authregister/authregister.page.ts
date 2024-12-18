import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authregister',
  templateUrl: './authregister.page.html',
  styleUrls: ['./authregister.page.scss'],
})
export class AuthregisterPage  {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.navCtrl.navigateRoot('/authlogin'); // Navega al login después de registrarse
        },
        (error) => console.error('Error al registrarse', error)
      );
    }
  }

  navigateToLogin() {
    this.navCtrl.navigateBack('/authlogin');
  }

  navegar() {
    this.navCtrl.navigateRoot('/home', { animated: true });
  }

}
