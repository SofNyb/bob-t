import { Component, OnInit } from '@angular/core';
import { BobToursService } from 'src/app/services/bob-tours.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tour-types',
  templateUrl: './tour-types.page.html',
  styleUrls: ['./tour-types.page.scss'],
})
export class TourTypesPage implements OnInit {

tourtypes: any;

  constructor(private btService: BobToursService) { }

  ngOnInit() {
    this.tourtypes = this.btService.tourtypes;
    // forEach loop over alle tourtypes
    this.tourtypes.forEach(tourtype => {
      const tours =
      _.filter(this.btService.tours, ['Tourtype', tourtype.ID]);
      tourtype['Count'] = tours.length;
    });
  }

}
