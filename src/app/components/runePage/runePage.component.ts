import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {RuneService} from '../../services/rune/rune.service';
import {RunePageItemComponent} from '../runePageItem/runePageItem.component';
import {TooltipDirective} from '../../directives/tooltip.directive';
import {TooltipService} from '../../services/tooltip/tooltip.service';
import {Slot} from '../../services/rune/Slot';


@Component({
  selector: 'rune-page-component',
  template: `
    <div id="rune-page">
      <rune-page-item-component
        *ngFor="#slot of runeService.current.slots"
        [rune]="{ slot: slot, image: runeService.runes[slot.runeId].image }"
        (click)="removeRune($event, slot)"
        [tooltip]="{ type: 'rune', data: runeService.runes[slot.runeId] }">
      </rune-page-item-component>
    </div>
  `,
  directives: [CORE_DIRECTIVES, RunePageItemComponent, TooltipDirective]
})
export class RunePageComponent {
  constructor(
    public runeService: RuneService,
    public tooltipService: TooltipService
  ) { };

  removeRune(event: MouseEvent, slot: Slot): void {
    this.tooltipService.hide();

    if (event.ctrlKey) {
      this.runeService.removeRune(slot, true);
    } else {
      this.runeService.removeRune(slot);
    }
  }
}
