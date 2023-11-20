import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';

import { BobToursService } from './services/bob-tours.service';

import { AboutComponent } from './components/about/about.component';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'star'
    },
    {
      title: 'Regions',
      url: '/regions',
      icon: 'images'
    },
    {
      title: 'Tour-Types',
      url: '/tour-types',
      icon: 'bus'
    },
    {
      title: 'Slideshow',
      url: '/slideshow',
      icon: 'play'
    }
  ];

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
settings: any = {};
price: any = { lower: 80, upper: 400};
hits: number = 24;

  constructor(
    private platform: Platform,
    private btService: BobToursService,
    private popoverCtrl: PopoverController,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.btService.initialize();
      this.loadSettings();
    });
  }

  // Load settings
  loadSettings(){
    this.storage.create().then(() => {
      this.storage.get('settings').then(settings => {
        if (settings == null) {
          this.settings.style = 'summer-style';
        } else {
          this.settings = settings;
        }
      });
    });
  }

  // User has changed their settings
  updateSettings () {
    this.storage.set('settings', this.settings);
    console.log(this.settings.notifications);
  }
  
  // User clicked 'About this app'
  async about () {
    const popover = await this.popoverCtrl.create({
      component: AboutComponent,
      translucent: true
    });
    await popover.present();
  }

  // User has changed price range.
  filterByPrice() {
    this.hits = this.btService.filterTours(this.price);
  }

}
