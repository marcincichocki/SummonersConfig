import {Component, Input, NgFor} from 'angular2/angular2';

import {RuneService} from '../../services/rune/rune.service';


@Component({
  selector: 'tooltip-rune-sums-component',
  template: `
    <div class="tooltip-rune-sums">
      <h3 class="name">#{{data.index + 1}} - {{ runeService.getName(data.index) }}</h3>
      <p class="sum" *ngFor="#sum of data.sums">
        <span class="value">{{ sum.value }}{{ runeService.isPercentage(sum.unitId) }}</span>
        <span class="unit">{{ runeService.stats[sum.unitId] }}</span>
      </p>
    </div>
  `,
  directives: [NgFor]
})
export class TooltipRuneSumsComponent {
  @Input() data;

  constructor(public runeService: RuneService) { }
}
