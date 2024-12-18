import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-authlogin',
  templateUrl: './authlogin.page.html',
  styleUrls: ['./authlogin.page.scss'],
})
export class AuthloginPage  {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          this.navCtrl.navigateRoot('/home'); // Navega a la página principal
        },
        (error) => console.error('Error al iniciar sesión', error)
      );
    }
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/authregister');
  }

  navegar() {
    this.navCtrl.navigateRoot('/home', { animated: true });
  }
  
}
