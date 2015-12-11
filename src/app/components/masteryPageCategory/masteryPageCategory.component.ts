import {Component, Input, CORE_DIRECTIVES} from 'angular2/angular2';

import {MasteryPageRowComponent} from '../masteryPageRow/masteryPageRow.component';
import {MasteryService} from '../../services/mastery/mastery.service';


@Component({
  selector: 'mastery-page-category-component',
  template: `
    <mastery-page-row-component
      *ngFor="#row of masteryService.grid[category.name], #index = index"
      [row]="row"
      [index]="index">
    </mastery-page-row-component>
    <h2>{{ category.name }}: {{ masteryService.current.sums[category.index] }}</h2>
  `,
  directives: [MasteryPageRowComponent, CORE_DIRECTIVES]
})
export class MasteryPageCategoryComponent {
  @Input() category;

  constructor(public masteryService: MasteryService) { }
}
