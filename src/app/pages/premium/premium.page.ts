import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage  {

  constructor(
    private paymentService: PaymentService,
    private navCtrl: NavController
  ) { }

  subscribe(plan: string) {
    this.paymentService.processPayment(plan).subscribe(
      (response:any) => {
        console.log('Pago exitoso:', response);
        alert('¡Suscripción exitosa! Ahora eres Premium.');
        this.navCtrl.navigateRoot('/home'); // Redirige al inicio
      },
      (error:any) => {
        console.error('Error al procesar el pago:', error);
        alert('Ocurrió un error al procesar el pago. Intenta de nuevo.');
      }
    );
  }

  navegar() {
    this.navCtrl.navigateRoot('/home', { animated: true });
  }

}
