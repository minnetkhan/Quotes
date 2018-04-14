import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { QuotesProvider } from '../../providers/quotes/quotes';

import { QuoteStructure } from '../../models/quote.interface';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {
  quotes;
  loading;

  constructor(private alertCtrl: AlertController, private quotesProviders: QuotesProvider,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private navCtrl: NavController) {
              console.log("constructor executes");
    this.getQuoteOfTheDay();
  }//constructor

  ionViewWillEnter() {
    if(typeof this.quotes === "undefined") {
      this.getQuotes();
      this.loading = this.loadingCtrl.create({
        content:'Breathe In... Breathe Out...'
      });
  
      this.loading.present();
    }
  }

  doInfinite(infiniteScroll):Promise<any> {
    return new Promise( (resolve) => {
      this.quotesProviders.getQuotes().subscribe(data => {
        this.quotes = this.quotes.concat(data);
        resolve();
      }, error => {
        infiniteScroll.complete();
        this.presentToast();
      });
    });
  }

  getQuotes() {
    /*
      get 10 quotes at once from server
    */
    this.quotesProviders.getQuotes().subscribe(data => {
      this.loading.dismiss();
      this.quotes = data;
    }, error => {
      console.log(error);
      this.presentToast();
    });
  } //getQuotes method

  getQuoteOfTheDay() {
    /*
      get 1 quote as soon as app loads
    */
    this.quotesProviders.getQuoteOfTheDay().subscribe(data => {
      data = {ID: data[0].ID, title: data[0].title, content: data[0].content};
      this.quoteOfTheDayAlert(<QuoteStructure>data);
    });
  } //getQuoteOfTheDay method

  quoteOfTheDayAlert(quote: QuoteStructure) {
    /*
      create alert and show quote of the day
    */
    let quoteAlert = this.alertCtrl.create({
      title: 'Quote of The Day',
      message: quote.content+'-'+quote.title,
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
            this.setFavorite(quote);
            //call method which make quotes favorite
          }
        }
      ]
    });
    quoteAlert.present();
  }//quoteOfTheDayAlert() method 

  setFavorite(quote) {
    /*
      Sets selected quote Favorite
    */
    let temp: QuoteStructure = {ID: quote.ID, title: quote.title, content: quote.content};
    this.quotesProviders.setFavorite(temp);
  }

  removeFavorite(quote: QuoteStructure) {
    this.quotesProviders.removeFavoriteQuote(quote)
  }//removeFavorite() method

  isFavorite(quote: QuoteStructure) {
    return this.quotesProviders.isQuoteFavorite(quote);
  }//isFavorite() method

  presentToast() {
    this.loading.dismiss();

    let toast = this.toastCtrl.create({
      message: 'Internet is not working. Redirecting To Favorite Tab.',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log("toast dismissed");
      this.navCtrl.parent.select(1);
    });

    toast.present();
  }//presentToast() method

}//LibraryPage class
