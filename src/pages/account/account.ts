import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  phonenumber: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {

  }

  ngAfterViewInit() {
    this.getPhoneNumber();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current phonenumber populated
  // clicking OK will update the phonenumber and display it
  // clicking Cancel will close the alert and do nothing
  changePhoneNumber() {
    let alert = this.alertCtrl.create({
      title: 'Change Phone Number',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'phonenumber',
      value: this.phonenumber,
      placeholder: 'phonenumber'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setPhoneNumber(data.phonenumber);
        this.getPhoneNumber();
      }
    });

    alert.present();
  }

  getPhoneNumber() {
    this.userData.getPhoneNumber().then((phonenumber) => {
      this.phonenumber = phonenumber;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
