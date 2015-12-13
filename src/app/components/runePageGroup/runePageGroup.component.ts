import {Component} from 'angular2/core';

import {RuneService} from '../../services/rune/rune.service';
import {PageGroupComponent} from '../pageGroup/pageGroup.component';


@Component({
  selector: 'rune-page-group-component',
  directives: [PageGroupComponent],
  template: `
    <page-group-component
      [type]="type"
      [service]="runeService">
    </page-group-component>
  `
})
export class RunePageGroupComponent {
  public type: string = 'rune-sums';
  constructor(public runeService: RuneService) { }
}
