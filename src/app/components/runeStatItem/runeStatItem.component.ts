import {Component, Input} from 'angular2/core';

import {RuneService} from '../../services/rune/rune.service';
import {Percent} from '../../pipes/percent.pipe';


@Component({
  selector: 'rune-stat-item-component',
  template: `
    <div>
      <h3 class="rune-stat-unit">{{ runeService.stats[sum.unitId] }}</h3>
      <p class="rune-stat-value">{{ sum.value }}{{ sum.unitId | percent }}</p>
    </div>
  `,
  pipes: [Percent]
})
export class RuneStatItemComponent {
  @Input() sum;
  constructor(public runeService: RuneService) {}
}
