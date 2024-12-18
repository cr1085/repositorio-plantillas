import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthregisterPageRoutingModule } from './authregister-routing.module';

import { AuthregisterPage } from './authregister.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthregisterPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AuthregisterPage]
})
export class AuthregisterPageModule {}
