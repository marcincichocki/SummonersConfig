import {Component, Input} from 'angular2/angular2';


@Component({
  selector: 'rune-list-item-component',
  template: `
    <div class="rune center-y">
      <div class="rune-image {{ rune.image }}s"></div>
      <p class="rune-description">{{ rune.description }}</p>
      <span class="rune-ip">{{ rune.ip }}</span>
    </div>
  `
})
export class RuneListItemComponent {
  @Input() rune;
}
