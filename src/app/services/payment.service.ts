import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'https://cli3cb.3cbsoluciones.com/api';

  constructor(private http: HttpClient) { }

  processPayment(plan: string) {
    const paymentDetails = {
      plan, // Puede ser 'monthly' o 'yearly'
      userId: this.getUserId(),
    };

    return this.http.post(`${this.baseUrl}/process-payment`, paymentDetails);
  }

  private getUserId() {
    // Simula obtener el ID del usuario actual (podría ser del token JWT)
    return '12345';
  }
}
