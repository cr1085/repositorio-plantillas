import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isAuthenticated = false;
  @ViewChild('authComponent') authComponent!: AuthComponent;


  templates: any[] = [];
  freeTemplates: any[] = [];
  premiumTemplates: any[] = [];
  isPremiumUser: boolean = false;
  isLoggedIn: boolean = false;
  user: any = null; // Datos del usuario
  guestSection: any = false; // Definir la propiedad
  hasAccess = false;

  constructor(
    private templateService: TemplateService,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isLoggedIn = status; // Actualiza si está logueado
    });
    this.isPremiumUser = this.authService.isLoggedIn() && this.authService.isPremiumUser(); // Verificar si el usuario es premium
    await this.loadTemplates();
  }

  login() {
    this.navCtrl.navigateRoot('/authlogin', { animated: true });
  }

  loadTemplates() {
    this.templateService.getTemplates('angular').pipe(
      tap((data: any) => {
        this.templates = data.plantillas;
        // Filtrar plantillas entre gratuitas y premium
        this.freeTemplates = this.templates.filter(template => !template.premium);
        this.premiumTemplates = this.templates.filter(template => template.premium);
      })
    ).subscribe({
      error: (error) => {
        console.error('Error al cargar las plantillas:', error);
      }
    });
  }

  openTemplate(url: string) {
    if (this.isLoggedIn) {
      window.open(url, '_blank');
    } else {
      this.navCtrl.navigateRoot('/authlogin', { animated: true });

    }
  }

  upgradeToPremium() {
    alert('Redirigiendo a la página de pago para adquirir una cuenta Premium...');
    // Aquí puedes redirigir a una página de pago
    // Redirigir a una página de pago o mostrar un mensaje
    if (this.isLoggedIn)
      this.navCtrl.navigateForward('/premium');
    else
      this.login();
  }

  checkAuthentication() {
    // Verifica si el usuario está autenticado
    this.isAuthenticated = this.authService.isLoggedIn();
    this.guestSection = !this.isAuthenticated; // Si no está autenticado, guestSection será true
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn(); // Verifica si el usuario está logueado
    this.guestSection = !this.isLoggedIn;
  }

  checkUser() {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getUser(); // Obtener datos del usuario
    }
  }

  checkUserAccess() {
    // Verifica si el usuario tiene acceso premium (puede obtenerse de un servicio o token)
    this.hasAccess = this.templateService.isPremiumUser();
  }
}
