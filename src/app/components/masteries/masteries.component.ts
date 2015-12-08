import {Component} from 'angular2/angular2';

import {MasteryPageComponent} from '../masteryPage/masteryPage.component';
import {MasteryPageGroupComponent} from '../masteryPageGroup/masteryPageGroup.component';
import {MasteryPageNameComponent} from '../masteryPageName/masteryPageName.component';
import {MasteryPageStatsComponent} from '../masteryPageStats/masteryPageStats.component';


@Component({
  directives: [
    MasteryPageComponent,
    MasteryPageGroupComponent,
    MasteryPageNameComponent,
    MasteryPageStatsComponent
  ],
  selector: 'masteries-component',
  template: `
    <aside class="col-4 main-aside column">
      <mastery-page-group-component class="component"></mastery-page-group-component>
      <mastery-page-name-component class="component"></mastery-page-name-component>
      <mastery-page-stats-component class="component"></mastery-page-stats-component>
    </aside>
    <section class="col-8 main-section center">
      <mastery-page-component></mastery-page-component>
    </section>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
    }
  `]
})
export class MasteriesComponent {}
