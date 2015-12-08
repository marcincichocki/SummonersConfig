import {Component} from 'angular2/angular2';

import {MasteryService} from '../../services/mastery/mastery.service';
import {PageNameComponent} from '../pageName/pageName.component';


@Component({
  selector: 'mastery-page-name-component',
  directives: [PageNameComponent],
  template: `
    <page-name-component
      [service]="masteryService"
      [placeholder]="placeholder">
    </page-name-component>
  `
})
export class MasteryPageNameComponent {
  private placeholder: string = 'New mastery page name';
  constructor(public masteryService: MasteryService) { }
}
