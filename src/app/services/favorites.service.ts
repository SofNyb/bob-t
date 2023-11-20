import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favIDs: Array<number> = [];
  public favTours: Array<any> = [];

  constructor(private storage: Storage) { }

  initialize(tours: any) {
    this.favTours = [];
    this.storage.create().then(() => {
      this.storage.get('FavoritesIDs').then(ids => {
        this.favIDs = ids;
        if (this.favIDs == null) {
          this.favIDs = [];
        } else {
          this.favIDs.forEach(favID => {
            let tour = tours.filter(t => t.ID == favID)[0];
            tour.isFavorite = true;
            this.favTours.push(tour);
          });
        }
      });
    });
  }

  add(tour) {
    this.favIDs.push(tour.ID);
    this.favTours.push(tour);
    //window.localStorage.setItem('FavoritesIDs', JSON.stringify(this.favIDs));
    this.storage.set('FavoritesIDs', this.favIDs);
  }

  remove(tour) {
    let removeIndex: number = this.favIDs.indexOf(tour.ID);
    if (removeIndex != -1) {
      this.favIDs.splice(removeIndex, 1);
      this.favTours.splice(removeIndex, 1);
      //window.localStorage.setItem('FavoritesIDs', JSON.stringify(this.favIDs));
      this.storage.set('FavoritesIDs', this.favIDs);
    }
  }

  reorder(ev) {
    ev.detail.complete(this.favTours);
    this.favIDs = this.favTours.map(tour => tour.ID);
    this.storage.set('FavoritesIDs', this.favIDs);
  }
}
