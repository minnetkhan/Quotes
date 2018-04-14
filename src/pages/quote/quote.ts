import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {
  person: string;
  content: string;

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    this.person = this.navParams.get('title');
    this.content = this.navParams.get('content');
  }

  onClose(remove = false) {
    this.viewCtrl.dismiss(remove);
  }

}
