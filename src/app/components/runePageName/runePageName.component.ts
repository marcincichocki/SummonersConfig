import {Component} from 'angular2/core';

import {RuneService} from '../../services/rune/rune.service';
import {PageNameComponent} from '../pageName/pageName.component';


@Component({
  selector: 'rune-page-name-component',
  directives: [PageNameComponent],
  template: `
    <page-name-component
      [service]="runeService"
      [placeholder]="placeholder">
    </page-name-component>
  `
})
export class RunePageNameComponent {
  private placeholder: string = 'New rune page name';
  constructor(public runeService: RuneService) { }
}
