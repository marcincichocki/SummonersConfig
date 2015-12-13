import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';


@Component({
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  selector: 'rune-search-component',
  template: `
    <div class="form-inline">
      <div class="form-group">
        <input class="form-control" type="text" placeholder="Search" [(ngModel)]="query">
      </div>
      <div class="form-group">
        <label class="checkbox" *ngFor="#tier of tiers">
          <input type="checkbox" [(ngModel)]="tier.selected">{{ tier.name }}
        </label>
      </div>
      <div class="form-group">
        <label class="checkbox">
          <input type="checkbox" [(ngModel)]="unavailable">Unavailable
        </label>
      </div>
    </div>
  `
})
export class RuneSearchComponent {
  public query: string = '';
  public unavailable: boolean = false;
  public tiers: Tier[] = [
    new Tier(1, 'Tier 1', false),
    new Tier(2, 'Tier 2', false),
    new Tier(3, 'Tier 3', true)
  ];

  getTiers() {
    return this.tiers.filter(tier => tier.selected).map(tier => tier.id);
  }
}


class Tier {
  constructor(
    public id: number,
    public name: string,
    public selected: boolean
  ) { }
}
