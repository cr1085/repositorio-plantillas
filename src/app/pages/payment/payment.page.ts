import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {

 userName: string = '';
  userEmail: string = '';
  selectedFile: File | null = null;

  constructor() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  sendPaymentProof(event: Event) {
    event.preventDefault();

    if (this.userName && this.userEmail && this.selectedFile) {
      // Simula el envío del comprobante
      console.log('Enviando comprobante...', {
        name: this.userName,
        email: this.userEmail,
        file: this.selectedFile,
      });

      alert('Comprobante enviado exitosamente. Verificaremos tu pago pronto.');
    } else {
      alert('Por favor, completa todos los campos y adjunta tu comprobante.');
    }
  }

}
