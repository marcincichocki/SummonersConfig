import {Component, Input} from 'angular2/angular2';

import {RuneService} from '../../services/rune/rune.service';


@Component({
  selector: 'rune-stat-item-component',
  template: `
    <div>
      <h3 class="rune-stat-unit">{{ runeService.stats[sum.unitId] }}</h3>
      <p class="rune-stat-value">{{ sum.value }}{{ runeService.isPercentage(sum.unitId) }}</p>
    </div>
  `
})
export class RuneStatItemComponent {
  @Input() sum;
  constructor(public runeService: RuneService) {}
}
