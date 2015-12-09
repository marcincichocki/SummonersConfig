import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

import {RuneService} from '../../services/rune/rune.service';
import {RuneStatItemComponent} from '../runeStatItem/runeStatItem.component';


@Component({
  selector: 'rune-stat-component',
  template: `
    <div class="row grow">
      <div class="col-8 column scrollable">
        <rune-stat-item-component
          *ng-for="#sum of runeService.current.sums, #i = index"
          [sum]="sum">
        </rune-stat-item-component>
      </div>
      <div class="col-4">
        <button class="btn btn-block"
          (click)="runeService.clearPage()"
          [disabled]="!runeService.current.sums.length">Clear</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-shrink: 1 !important;
      -ms-flex-negative: 1 !important;
      flex-shrink: 1 !important;
    }
  `],
  directives: [CORE_DIRECTIVES, RuneStatItemComponent]
})
export class RuneStatComponent {
  constructor(public runeService: RuneService) {};
}
