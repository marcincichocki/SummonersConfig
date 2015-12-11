import {Component, NgFor} from 'angular2/angular2';

import {MasteryService} from '../../services/mastery/mastery.service';
import {MasteryPageCategoryComponent} from '../masteryPageCategory/masteryPageCategory.component';


@Component({
  selector: 'mastery-page-component',
  template: `
    <div id="mastery-page">
      <mastery-page-category-component class="category {{ category | lowercase }}"
        *ngFor="#category of masteryService.categories, #index = index"
        [category]="{ name: category, index: index }">
      </mastery-page-category-component>
    </div>
  `,
  directives: [NgFor, MasteryPageCategoryComponent]
})
export class MasteryPageComponent {
  constructor(public masteryService: MasteryService) { }
}
