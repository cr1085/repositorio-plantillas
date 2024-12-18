import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent   {


  constructor(private navCtrl: NavController) {

}

  getStarted() {
    this.navCtrl.navigateRoot('/instructions', { animated: true });
  }

}
