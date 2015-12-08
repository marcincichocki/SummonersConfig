import {Component, Input} from 'angular2/angular2';


@Component({
  selector: 'rune-page-item-component',
  template: `
    <div class="rune-image {{ rune.image }}" id="rune-slot-{{ rune.slot.runeSlotId }}"></div>
  `,
})
export class RunePageItemComponent {
  @Input() rune;
}
