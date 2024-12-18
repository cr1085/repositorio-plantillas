import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { AuthService } from 'src/app/services/auth.service';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit  {

   isAuthenticated = false;
    @ViewChild('authComponent') authComponent!: AuthComponent;


    popularTemplates:any = [];
    hasAccess = false;

    slideOpts = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 1.2,
      spaceBetween: 10
    };

    showLoginModal: boolean=false;
    showRegisterModal: boolean=false;
    isLoggedIn: boolean = false;
    user: any = null; // Datos del usuario
    guestSection: any = false; // Definir la propiedad

    constructor(private navCtrl: NavController, private templateService: TemplateService, private authService: AuthService) { }

    ngOnInit() {
      this.authService.isAuthenticated$.subscribe((status) => {
        this.isLoggedIn = status; // Actualiza si está logueado
        if (status) {
          this.checkUser(); // Cargar información del usuario si está autenticado
        }
      });
      this.loadPopularTemplates();
      this.checkUserAccess();
      // this.checkAuthentication();



    }

    getStarted() {
      this.navCtrl.navigateRoot('/instructions',{animated:true});
    }

    navigateTo(category: string) {
      // Navega a una categoría específica
      this.navCtrl.navigateForward(`/tabs/${category}`);
    }


    loadPopularTemplates() {
      this.templateService.getPopularTemplates().subscribe(
        (data: any) => {
          this.popularTemplates = data.templates;
        },
        (error) => {
          console.error('Error al cargar plantillas populares:', error);
        }
      );
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
        console.log('Usuario cargado:', this.user); // Agrega un log para depuración
      } else {
        this.user = null; // Si no está autenticado, asegura que sea null
      }
    }

    logout() {
      this.authService.logout();
      this.user = null; // Limpiar datos
      this.navCtrl.navigateRoot('/home', {animated:true});

    }

    checkUserAccess() {
      // Verifica si el usuario tiene acceso premium (puede obtenerse de un servicio o token)
      this.hasAccess = this.templateService.isPremiumUser();
    }



    viewTemplate(template: any) {
     if(this.isLoggedIn){
       if (!template.id || !template.category) {
         console.error('La plantilla no tiene un ID o categoría válida:', template);
         return;
       }

       this.templateService.registerView(template.category, template.id).subscribe(
         () => {
           console.log(`Vista registrada para la plantilla: ${template.nombre}`);
           window.open(template.url, '_blank');
         },
         (error) => {
           console.error('Error al registrar la vista:', error);
         }
       );
      }else{
       this.navCtrl.navigateRoot('/authlogin', {animated:true});
      }
    }


   upgradeToPremium() {
      // Redirigir a una página de pago o mostrar un mensaje
     if (this.isLoggedIn)
       this.navCtrl.navigateForward('/premium');
     else
       this.login();
    }

    login() {
      this.navCtrl.navigateRoot('/authlogin', { animated: true });
    }

    openLoginModal() {
      this.authComponent.openLogin();
      this.showLoginModal = true; // Asegúrate de que inert funcione
    }

    closeModal() {
      this.showLoginModal = false;
      this.showRegisterModal = false;
    }

    // Método para manejar éxito en autenticación
    onAuthSuccess() {
      console.log('Usuario autenticado exitosamente');
      this.isAuthenticated = true; // Actualiza el estado de autenticación
    }

}
