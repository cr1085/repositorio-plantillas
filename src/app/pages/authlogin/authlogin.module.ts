import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthloginPageRoutingModule } from './authlogin-routing.module';

import { AuthloginPage } from './authlogin.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthloginPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [AuthloginPage]
})
export class AuthloginPageModule {}
