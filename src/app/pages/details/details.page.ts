import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BobToursService } from 'src/app/services/bob-tours.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { RequestPage } from './../request/request.page';
import { MapPage } from './../map/map.page';
import * as _ from 'lodash';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  tour = null as any;
  isFavorite: boolean = false;
  region: string;
  tourtype: string;
  showSocial: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public btService: BobToursService,
    public favService: FavoritesService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tour = _.find(this.btService.tours, ['ID', parseInt(id)]);
    this.isFavorite = this.favService.favIDs.indexOf(Number(id)) != -1;
    this.region = _.find(this.btService.regions, {'ID': this.tour.Region}) .Name; //string variabel
    this.tourtype = _.find(this.btService.tourtypes, {'ID': this.tour.Tourtype}) .Name; //string variable
  }

  // tilføj og fjern fra favorit
  async presentActionSheet () {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tour',
      buttons: [{
        // første button nedenunder
        text: 'Request',
        handler: () => {
          this.presentModal();
          }
        },
        {
          text: 'Map/Route',
          handler: () => {
            this.presentMap();
          }
        },
        // knap nr. 2 nedenunder
        {
        text: (this.isFavorite) ? 'Remove from Favorites' : 'Add to Favorites',
        role: (this.isFavorite) ? 'destructive' : '',
        handler: () => {
          if (this.isFavorite) {
            this.presentAlert ();
            // this.favService.remove(this.tour);
            // this.isFavorite = false;
            } else {
              this.favService.add(this.tour);
              this.isFavorite = true;
            }
          }
        },
        // 3. knap nedenunder
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }


  //tilføj en "alert" til at godkende handling ved eks. fjerne fra favorit
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Remove from Favorite?',
      message: 'Do you really want to remove this from Favorite?',
      buttons: [
        // 1. knap
        {
          text: 'No'
        },
        // 2. knap
        {
          text: 'Yes',
          handler: () => {
            this.favService.remove(this.tour);
            this.isFavorite = false;
          }
        }
      ]
    });
    await alert.present();
  }

  // user clicked share button
  toggleSocial () {
    this.showSocial = !this.showSocial;
  }

  // user clicked one of the social app buttons
  openSocial(app) {
    console.log('User wants to share this tour via' + app + '!');
  }

  // user clicked 'request' butoon
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RequestPage,
      componentProps: this.tour
    });
    modal.present();
  }

  //User clicked 'map' button
  async presentMap () {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: this.tour
    });
    modal.present();
  }
}