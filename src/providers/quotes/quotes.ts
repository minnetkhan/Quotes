import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { QuoteStructure } from '../../models/quote.interface';

@Injectable()
export class QuotesProvider {
  /*
    
  */
  url: string = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=';
  favouriteQuotes: QuoteStructure[] = [];

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.forEach( (value, key, index) => {
      console.log('provider constructor: ' + this.favouriteQuotes);
      this.favouriteQuotes.push(value);
    });
  }

  getQuoteOfTheDay(){
    return this.http.get(this.url+'1');
  }

  getQuotes() {
    console.log('getQuotes called');
    return this.http.get(this.url+'10', { 
      headers: { 
        
        } 
      });
  }

  setFavorite(quote: QuoteStructure) {
    let position = this.favouriteQuotes.findIndex((favoriteQuotesEl: QuoteStructure) => {return favoriteQuotesEl.ID == quote.ID});
    
    if(position == -1) {
      this.favouriteQuotes.push(quote);
      this.storage.set(<string>quote.ID, quote);
    }
  }

  getFavoriteQuotes() {
    return this.favouriteQuotes;
  }

  isQuoteFavorite(quote: QuoteStructure) {
    return this.favouriteQuotes.find((favoriteQuotesEl: QuoteStructure) => {return favoriteQuotesEl.ID == quote.ID});
  }

  removeFavoriteQuote(quote: QuoteStructure) {
    let position = this.favouriteQuotes.findIndex((favoriteQuotesEl: QuoteStructure) => {return favoriteQuotesEl.ID == quote.ID});
    this.favouriteQuotes.splice(position, 1);
    this.storage.remove(quote.ID);
  }
}
