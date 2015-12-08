import {Component, Input, NgFor} from 'angular2/angular2';

import {MasteryService} from '../../services/mastery/mastery.service';
import {MasteryPageStatsItemComponent} from '../masteryPageStatsItem/masteryPageStatsItem.component';


@Component({
  selector: 'tooltip-mastery-sums-component',
  template: `
    <div class="tooltip-mastery-sums">
      <h3 class="name">#{{ data.index + 1 }} - {{ masteryService.getName(data.index) }}</h3>
      <div class="mastery-category-points">
        <mastery-page-stats-item-component class="{{ masteryService.categories[i] | lowercase }}"
          *ng-for="#sum of data.sums, #i = index"
          [sum]="sum"
          [index]="i + 1">
        </mastery-page-stats-item-component>
      </div>
    </div>
  `,
  directives: [NgFor, MasteryPageStatsItemComponent]
})
export class TooltipMasterySumsComponent {
  @Input() data;

  constructor(public masteryService: MasteryService) { }
}
