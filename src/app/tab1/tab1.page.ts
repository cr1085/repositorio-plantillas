import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PaymentmodalComponent } from '../components/paymentmodal/paymentmodal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

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
  singlePurchaseTemplates: any[] = []; // Solo plantillas de pago único
  showQrModal: boolean = false;
  isOpen: boolean = false;
  @ViewChild(IonModal) modal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  selectedTemplate: any = null; // Plantilla seleccionada
  // showQrModal: boolean = false;
  currentDate!: string;

  constructor(
    private templateService: TemplateService,
    private authService: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {
    // Generar la fecha actual en formato ISO (YYYY-MM-DD)
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Extraer solo la fecha

   }

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

  // loadTemplates() {
  //   this.templateService.getTemplates('web').pipe(
  //     tap((data: any) => {
  //       this.templates = data.plantillas;
  //       // Filtrar plantillas entre gratuitas y premium
  //       this.freeTemplates = this.templates.filter(template => !template.premium);
  //       this.premiumTemplates = this.templates.filter(template => template.premium);
  //     })
  //   ).subscribe({
  //     error: (error) => {
  //       console.error('Error al cargar las plantillas:', error);
  //     }
  //   });
  // }


  loadTemplates() {
    this.templateService.getTemplates('web').pipe(
      tap((data: any) => {
        // Filtrar por categorías
        this.freeTemplates = data.plantillas.filter((t: any) => !t.premium && !t.singlePurchase);
        this.premiumTemplates = data.plantillas.filter((t: any) => t.premium);
        this.singlePurchaseTemplates = data.plantillas.filter((t: any) => t.singlePurchase);
      })
    ).subscribe({
      error: (error) => {
        console.error('Error al cargar las plantillas:', error);
      },
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

  purchaseTemplate(template: any) {
    // Paso 1: Iniciar el pago
    this.templateService.startPayment(template.id).subscribe(
      (response: any) => {
        console.log('Pago iniciado:', response);

        // Simula que el usuario completa el pago
        const confirmPayment = confirm(
          `Confirma el pago de $${template.price} para la plantilla: ${template.nombre}?`
        );

        if (confirmPayment) {
          // Paso 2: Confirmar el pago
          this.templateService.confirmPayment(response.paymentId).subscribe(
            (confirmation: any) => {
              console.log('Pago confirmado:', confirmation);

              // Paso 3: Abrir la URL de descarga
              window.open(confirmation.downloadUrl, '_blank');
            },
            (error) => {
              console.error('Error al confirmar el pago:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al iniciar el pago:', error);
      }
    );
  }


  onModalClosed() {
    this.showQrModal = false;
    document.querySelector('ion-router-outlet')?.removeAttribute('aria-hidden');
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }




  closeModal() {
    this.showQrModal = false; // Cierra el modal
    this.selectedTemplate = null;
  }


  // openQrModal(template: any) {
  //   this.selectedTemplate = template;
  //   this.showQrModal = true; // Abre el modal
  // }

  openQrModal(template: any) {
    this.selectedTemplate = template; // Establece la plantilla seleccionada
    this.showQrModal = true; // Abre el modal
  }

  closeQrModal() {
    this.showQrModal = false; // Cierra el modal
    this.selectedTemplate = null; // Limpia la plantilla seleccionada
  }

  // onPaymentConfirmed() {
  //   alert('Pago confirmado. Ahora puedes descargar la plantilla.');
  //   this.closeModal();
  // }

  onPaymentConfirmed() {
    alert('Pago confirmado. Habilitando la descarga de la plantilla.');
    this.closeQrModal(); // Cierra el modal
  }

}
