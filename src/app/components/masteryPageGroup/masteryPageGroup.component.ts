import {Component} from 'angular2/angular2';

import {MasteryService} from '../../services/mastery/mastery.service';
import {PageGroupComponent} from '../pageGroup/pageGroup.component';


@Component({
  selector: 'mastery-page-group-component',
  directives: [PageGroupComponent],
  template: `
    <page-group-component
      [type]="type"
      [service]="masteryService">
    </page-group-component>
  `
})
export class MasteryPageGroupComponent {
  public type: string = 'mastery-sums';
  constructor(public masteryService: MasteryService) { }
}
