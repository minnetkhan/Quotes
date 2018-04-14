import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { QuotesProvider } from '../../providers/quotes/quotes';
import { QuoteStructure } from '../../models/quote.interface';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  quotes: QuoteStructure[];
  
  constructor(private quotesProvider: QuotesProvider, private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.quotes = this.quotesProvider.getFavoriteQuotes();
  }

  onViewQuote(quote) {
    const modal = this.modalCtrl.create('QuotePage', quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove) {
        this.quotesProvider.removeFavoriteQuote(quote);
      }
    });
  }
}
