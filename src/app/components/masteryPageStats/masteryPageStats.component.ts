import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {MasteryService} from '../../services/mastery/mastery.service';
import {MasteryPageStatsItemComponent} from '../masteryPageStatsItem/masteryPageStatsItem.component';


@Component({
    selector: 'mastery-page-stats-component',
    template: `
      <div class="row">
        <div class="col-8">
          <div class="mastery-category-points">
            <mastery-page-stats-item-component class="{{ masteryService.categories[i] | lowercase }}"
              *ngFor="#sum of masteryService.current.sums, #i = index"
              [sum]="sum"
              [index]="i + 1">
            </mastery-page-stats-item-component>
          </div>
        </div>
        <div class="col-4">
          <button class="btn btn-block"
            (click)="masteryService.clearPage()"
            [disabled]="!masteryService.current.masteries.length">Clear</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2>Points available: {{ masteryService.current.max }}</h2>
        </div>
      </div>
    `,
    directives: [NgFor, MasteryPageStatsItemComponent]
})
export class MasteryPageStatsComponent {
  constructor(public masteryService: MasteryService) { }
}
