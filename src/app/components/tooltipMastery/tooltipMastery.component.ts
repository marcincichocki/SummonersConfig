import {Component, Input} from 'angular2/core';
import {NgClass, NgFor} from 'angular2/common';

import {MasteryService} from '../../services/mastery/mastery.service';


@Component({
  selector: 'tooltip-mastery-component',
  directives: [NgClass, NgFor],

  /**
   * Description using [innerHtml] insted of standard interpolation
   * because of HTML tag inside description messages(rito pls) like <br>
   */
  template: `
    <div class="tooltip-mastery">
      <h3 class="c{{ getCategory(data.mastery.id) }}">
        {{ data.mastery.name }}
      </h3>
      <p class="rank"
        [ngClass]="{
          available: masteryService.masteryCheckUp(data.mastery.id),
          active: data.rank > 0
        }">Rank:
        <span>{{ data.rank || 0 }} /</span>
        <span>{{ data.mastery.ranks }}</span>
      </p>
      <p class="description"
        [innerHtml]="description"
        *ngFor="#description of data.mastery.description, #i = index"
        [ngClass]="{
          current: data.rank - 1 === i,
          next: (data.rank || 0) === i
        }">
      </p>
    </div>
  `
})
export class TooltipMasteryComponent {
  @Input() data;
  constructor(public masteryService: MasteryService) { }


  getCategory(id: number): number {
    return parseInt(id.toString().slice(1, 2), 10);
  }
}
