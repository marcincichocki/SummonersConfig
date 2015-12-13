import {Component, Input} from 'angular2/core';
import {NgClass, NgIf} from 'angular2/common';

import {MasteryService} from '../../services/mastery/mastery.service';


@Component({
  selector: 'mastery-page-mastery-component',
  template: `
    <div class="mastery m{{ mastery }}"
      [ngClass]="{
        available: masteryService.masteryCheckUp(mastery),
        active: isMasteryActive(mastery),
        max: isMasteryMaxed(mastery)
      }">

      <p class="rank" *ngIf="masteryService.isEven(rowIndex)">
        <span>{{ masteryService.current.rank[mastery] || 0 }}/</span>
        <span>{{ masteryService.masteries[mastery].ranks }}</span>
      </p>
    </div>
  `,
  directives: [NgClass, NgIf]
})
export class MasteryPageMasteryComponent {
  @Input() rowIndex;
  @Input() mastery;

  constructor(public masteryService: MasteryService) { }


  isMasteryMaxed(id: number): boolean {
    return (this.masteryService.current.rank[id] || 0) === this.masteryService.masteries[id].ranks;
  }

  isMasteryActive(id: number): boolean {
    return (this.masteryService.current.rank[id] || 0) > 0;
  }
}
