import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthregisterPage } from './authregister.page';

const routes: Routes = [
  {
    path: '',
    component: AuthregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthregisterPageRoutingModule {}
