import {Component, Input} from 'angular2/core';


@Component({
  selector: 'mastery-page-stats-item-component',
  template: `
    <div class="mastery-category-point">
      <div class="c{{ index }}-image"></div>
      <span>{{ sum }}</span>
    </div>
  `
})
export class MasteryPageStatsItemComponent {
  @Input() sum;
  @Input() index;
}
