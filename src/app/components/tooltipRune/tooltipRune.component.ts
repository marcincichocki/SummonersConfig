import {Component, Input} from 'angular2/angular2';


@Component({
  selector: 'tooltip-rune-component',
  template: `
    <div class="tooltip-rune">
      <h3 class="name {{ rune.type }}">{{ rune.name }}</h3>
      <p class="description">{{ rune.description }}</p>
      <span class="tier">Tier {{ rune.tier }}</span>
      <span class="ip">{{ rune.ip }} ip</span>
    </div>
  `
})
export class TooltipRuneComponent {
  @Input('data') rune;
}
