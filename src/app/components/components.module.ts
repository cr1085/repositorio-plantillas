import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { TemplateCardComponent } from './template-card/template-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadComponent } from './head/head.component';
import { PaymentmodalComponent } from './paymentmodal/paymentmodal.component';



@NgModule({
  declarations: [
    AuthComponent,
    TemplateCardComponent,
    HeadComponent,
    PaymentmodalComponent
  ],
  exports: [
    AuthComponent,
    TemplateCardComponent,
    HeadComponent,
    PaymentmodalComponent
  ],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
