import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  constructor(private alertCtrl: AlertController) {
    this.quoteOfTheDayAlert();
  }//constructor

  quoteOfTheDayAlert() {
    let quoteAlert = this.alertCtrl.create({
      title: 'Quote of The Day',
      message: 'hi there',
      buttons: [
        {
          text: 'Dismiss',
          role: 'Cancel',
          handler: () => {
            console.log("dismissed");
          }
        },
        {
          text: 'Favorite',
          handler: () => {
            //call method which make quotes favorite
          }
        }
      ]
    });
    quoteAlert.present();
  }//quoteOfTheDayAlert() method 

}//LibraryPage class
