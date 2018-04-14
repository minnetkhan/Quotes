webpackJsonp([2],{

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibraryPageModule", function() { return LibraryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LibraryPageModule = /** @class */ (function () {
    function LibraryPageModule() {
    }
    LibraryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__library__["a" /* LibraryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__library__["a" /* LibraryPage */]),
            ],
        })
    ], LibraryPageModule);
    return LibraryPageModule;
}());

//# sourceMappingURL=library.module.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_quotes_quotes__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LibraryPage = /** @class */ (function () {
    function LibraryPage(alertCtrl, quotesProviders, loadingCtrl, toastCtrl, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.quotesProviders = quotesProviders;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        console.log("constructor executes");
        this.getQuoteOfTheDay();
    } //constructor
    LibraryPage.prototype.ionViewWillEnter = function () {
        if (typeof this.quotes === "undefined") {
            this.getQuotes();
            this.loading = this.loadingCtrl.create({
                content: 'Breathe In... Breathe Out...'
            });
            this.loading.present();
        }
    };
    LibraryPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.quotesProviders.getQuotes().subscribe(function (data) {
                _this.quotes = _this.quotes.concat(data);
                resolve();
            }, function (error) {
                infiniteScroll.complete();
                _this.presentToast();
            });
        });
    };
    LibraryPage.prototype.getQuotes = function () {
        var _this = this;
        /*
          get 10 quotes at once from server
        */
        this.quotesProviders.getQuotes().subscribe(function (data) {
            _this.loading.dismiss();
            _this.quotes = data;
        }, function (error) {
            console.log(error);
            _this.presentToast();
        });
    }; //getQuotes method
    LibraryPage.prototype.getQuoteOfTheDay = function () {
        var _this = this;
        /*
          get 1 quote as soon as app loads
        */
        this.quotesProviders.getQuoteOfTheDay().subscribe(function (data) {
            data = { ID: data[0].ID, title: data[0].title, content: data[0].content };
            _this.quoteOfTheDayAlert(data);
        });
    }; //getQuoteOfTheDay method
    LibraryPage.prototype.quoteOfTheDayAlert = function (quote) {
        var _this = this;
        /*
          create alert and show quote of the day
        */
        var quoteAlert = this.alertCtrl.create({
            title: 'Quote of The Day',
            message: quote.content + '-' + quote.title,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'Cancel',
                    handler: function () {
                        console.log("dismissed");
                    }
                },
                {
                    text: 'Favorite',
                    handler: function () {
                        _this.setFavorite(quote);
                        //call method which make quotes favorite
                    }
                }
            ]
        });
        quoteAlert.present();
    }; //quoteOfTheDayAlert() method 
    LibraryPage.prototype.setFavorite = function (quote) {
        /*
          Sets selected quote Favorite
        */
        var temp = { ID: quote.ID, title: quote.title, content: quote.content };
        this.quotesProviders.setFavorite(temp);
    };
    LibraryPage.prototype.removeFavorite = function (quote) {
        this.quotesProviders.removeFavoriteQuote(quote);
    }; //removeFavorite() method
    LibraryPage.prototype.isFavorite = function (quote) {
        return this.quotesProviders.isQuoteFavorite(quote);
    }; //isFavorite() method
    LibraryPage.prototype.presentToast = function () {
        var _this = this;
        this.loading.dismiss();
        var toast = this.toastCtrl.create({
            message: 'Internet is not working. Redirecting To Favorite Tab.',
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log("toast dismissed");
            _this.navCtrl.parent.select(1);
        });
        toast.present();
    }; //presentToast() method
    LibraryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-library',template:/*ion-inline-start:"/Users/tonystark/Projects/IonicProjects/quotes/src/pages/library/library.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Library</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div *ngIf="quotes">\n    <ion-card *ngFor="let quote of quotes" class="stars small">\n      <ion-card-content >\n        <span [innerHtml]="quote.content"></span>\n        <p class="author" [innerHtml]="quote.title"></p>\n      </ion-card-content>\n\n      <ion-row>\n        <ion-col text-right>\n          <button \n            ion-button\n            small\n            clear\n            (click)="setFavorite(quote)"\n            *ngIf="!isFavorite(quote)">\n            <ion-icon name="heart-outline"></ion-icon>\n            FAVORITE\n          </button>\n\n          <button \n            ion-button\n            small\n            clear\n            color="danger"\n            (click)="removeFavorite(quote)"\n            *ngIf="isFavorite(quote)">\n            <ion-icon name="heart"></ion-icon>\n            UNFAVORITE\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n\n    <ion-infinite-scroll (ionInfinite)="$event.waitFor(doInfinite())">\n      <ion-infinite-scroll-content \n      loadingSpinner="bubbles"\n      loadingText="Breathe In... Breathe Out...">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/tonystark/Projects/IonicProjects/quotes/src/pages/library/library.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_quotes_quotes__["a" /* QuotesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_quotes_quotes__["a" /* QuotesProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _e || Object])
    ], LibraryPage);
    return LibraryPage;
    var _a, _b, _c, _d, _e;
}()); //LibraryPage class

//# sourceMappingURL=library.js.map

/***/ })

});
//# sourceMappingURL=2.js.map