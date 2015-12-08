import {Component, Input, NgClass, NgFor} from 'angular2/angular2';

import {MasteryPageMasteryComponent} from '../masteryPageMastery/masteryPageMastery.component';
import {MasteryService} from '../../services/mastery/mastery.service';
import {TooltipDirective} from '../../directives/tooltip.directive';


@Component({
  selector: 'mastery-page-row-component',
  template: `
    <div class="mastery-row row{{ rowIndex + 1 }}"
      [ng-class]="{ even: masteryService.isEven(rowIndex + 1) }">
      <mastery-page-mastery-component
        *ng-for="#mastery of row"
        [tooltip]="{
          type: 'mastery',
          data: {
            mastery: masteryService.masteries[mastery],
            rank: masteryService.current.rank[mastery]
          }
        }"
        (click)="masteryService.addMastery(mastery)"
        (contextmenu)="onRightClick(mastery, $event)"
        (wheel)="onWheel(mastery, $event)"
        [mastery]="mastery"
        [row-index]="rowIndex">
      </mastery-page-mastery-component>
    </div>
  `,
  directives: [MasteryPageMasteryComponent, NgClass, NgFor, TooltipDirective]
})
export class MasteryPageRowComponent {
  @Input() row;
  @Input('index') rowIndex;

  constructor(public masteryService: MasteryService) { }

  onRightClick(mastery, event: MouseEvent): void {

    // Prevent context menu from showing up.
    event.preventDefault();


    this.masteryService.removeMastery(mastery);
  }

  onWheel(id: number, event: WheelEvent): void {

    // Prevent page from scrolling.
    event.preventDefault();


    if (event.deltaY > 0) {
      this.masteryService.removeMastery(id);
    } else {
      this.masteryService.addMastery(id);
    }
  }
}
