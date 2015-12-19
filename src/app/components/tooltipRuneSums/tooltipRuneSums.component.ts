import {Component, Input} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {RuneService} from '../../services/rune/rune.service';
import {Percent} from '../../pipes/percent.pipe';


@Component({
  selector: 'tooltip-rune-sums-component',
  template: `
    <div class="tooltip-rune-sums">
      <h3 class="name">#{{data.index + 1}} - {{ runeService.getName(data.index) }}</h3>
      <p class="sum" *ngFor="#sum of data.sums">
        <span class="value">{{ sum.value }}{{ sum.unitId | percent }}</span>
        <span class="unit">{{ runeService.stats[sum.unitId] }}</span>
      </p>
    </div>
  `,
  directives: [NgFor],
  pipes: [Percent]
})
export class TooltipRuneSumsComponent {
  @Input() data;

  constructor(public runeService: RuneService) { }
}
