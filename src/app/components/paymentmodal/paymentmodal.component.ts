import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-paymentmodal',
  templateUrl: './paymentmodal.component.html',
  styleUrls: ['./paymentmodal.component.scss'],
})
export class PaymentmodalComponent {


  datapayment: any = {
    paymentId: '',
    templateId: '',
    templateName: '',
    price: '',
    status: 'pending',
  };

  passpayment: boolean = false;

  @Input() templateId!: number;
  @Input() price!: number;
  @Input() date!: string;
  @Input() nametemplate!: string;

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  paymentEvidence: File | null = null; // Evidencia de pago

  // name: string;
  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();
  errorMessage: string | null = null; // Mensaje de error

  templateService = inject(TemplateService);


  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.cancelEvent.emit();
    this.errorMessage = null;
    this.passpayment = false;

    this.name = '';
    this.datapayment = {
      paymentId: '',
      templateId: '',
      templateName: '',
      price: '',
      status: 'pending',
    };
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.confirmEvent.emit(this.name);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  // Manejar la carga del archivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.paymentEvidence = input.files[0];
    }
  }


  // Método para enviar los datos al backend
  sendToBackend() {
    // if (!this.paymentEvidence) {
    //   alert('Por favor adjunte la evidencia del pago.');
    //   return;
    // }

    // Verificar si los campos requeridos están completos
    if (!this.name || !this.nametemplate || !this.price || !this.date || !this.paymentEvidence) {
      this.errorMessage = 'Por favor completa todos los campos y adjunta la evidencia de pago.';
      return;
    }

    // Restablecer el mensaje de error si todo está completo
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('date', this.date);
    formData.append('paymentEvidence', this.paymentEvidence);

    // Aquí deberías usar un servicio HTTP para enviar los datos al backend.
    console.log('Enviando datos al backend:', formData);

    alert('Datos enviados exitosamente con la evidencia de pago.');
  }

  purchaseTemplate() {

    // Verificar si los campos requeridos están completos
    // if (!this.name || !this.nametemplate || !this.price || !this.date || !this.paymentEvidence) {
    //   this.errorMessage = 'Por favor completa todos los campos y adjunta la evidencia de pago.';
    //   return;
    // }

    if (!this.templateId) {
      this.errorMessage = 'Por favor completa todos los campos y adjunta la evidencia de pago.';
      return;
    }


    // Restablecer el mensaje de error si todo está completo
    this.errorMessage = null;

    // const formData = new FormData();
    // formData.append('name', this.name);
    // formData.append('price', this.price.toString());
    // formData.append('date', this.date);
    // formData.append('paymentEvidence', this.paymentEvidence);

    // Aquí deberías usar un servicio HTTP para enviar los datos al backend.
    // console.log('Enviando datos al backend:', formData);

    alert('Datos enviados exitosamente con la evidencia de pago.');

    console.log('template id:', this.templateId);
    // Paso 1: Iniciar el pago
    this.templateService.startPayment(this.templateId).subscribe(
      (response: any) => {
        console.log('Pago iniciado:', response);

        // Simula que el usuario completa el pago
        const confirmPayment = confirm(
          `Confirma el pago de $${this.price} para la plantilla: ${this.nametemplate}?`
        );

        if (confirmPayment) {

          this.passpayment = confirmPayment;

          this.datapayment = {
            paymentId: response.paymentId,
            templateId: this.templateId,
            templateName: this.nametemplate,
            price: this.price,
            status: 'pending',
          };

          // Paso 2: Confirmar el pago
          // this.templateService.confirmPayment(response.paymentId).subscribe(
          //   (confirmation: any) => {
          //     console.log('Pago confirmado:', confirmation);

          //     // Paso 3: Abrir la URL de descarga
          //     window.open(confirmation.downloadUrl, '_blank');
          //   },
          //   (error) => {
          //     console.error('Error al confirmar el pago:', error);
          //   }
          // );



        }
      },
      (error) => {
        console.error('Error al iniciar el pago:', error);
      }
    );
  }

  // Confirmar el Pago
  confirmPayment() {
    if (!this.name || !this.nametemplate || !this.price || !this.date || !this.paymentEvidence) {
      this.errorMessage = 'Por favor completa todos los campos y adjunta la evidencia de pago.';
      return;
    }

    this.errorMessage = null;

    console.log('Datos de pago total: ', this.datapayment);

    this.templateService.confirmPayment(this.datapayment.paymentId).subscribe(
      (confirmation: any) => {
        console.log('Pago confirmado:', confirmation);

        alert('Pago confirmado disfruta tu producto');

        this.passpayment = false;

        this.name = '';
        this.datapayment = {
          paymentId: '',
          templateId: '',
          templateName: '',
          price: '',
          status: 'pending',
        };
        // Paso 3: Abrir la URL de descarga
        window.open(confirmation.downloadUrl, '_blank');
      },
      (error) => {
        console.error('Error al confirmar el pago:', error);
      }
    );


  }

}
