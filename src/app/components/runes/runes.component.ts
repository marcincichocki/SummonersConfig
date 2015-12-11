import {Component} from 'angular2/angular2';

import {RuneSearchComponent} from '../runeSearch/runeSearch.component';
import {RuneListComponent} from '../runeList/runeList.component';
import {RuneStatComponent} from '../runeStat/runeStat.component';
import {RunePageComponent} from '../runePage/runePage.component';
import {RunePageNameComponent} from '../runePageName/runePageName.component';
import {RuneIpTimeComponent} from '../runeIpTime/runeIpTime.component';
import {RunePageGroupComponent} from '../runePageGroup/runePageGroup.component';


@Component({
  directives: [
    RuneSearchComponent,
    RuneListComponent,
    RuneStatComponent,
    RunePageComponent,
    RunePageNameComponent,
    RuneIpTimeComponent,
    RunePageGroupComponent
  ],
  selector: 'runes-component',
  template: `
    <aside class="col-4 main-aside column">
      <rune-page-group-component class="component"></rune-page-group-component>
      <rune-page-name-component class="component"></rune-page-name-component>
      <rune-ip-time-component class="component"></rune-ip-time-component>
      <rune-stat-component class="component"></rune-stat-component>
    </aside>
    <section class="col-8 main-section center">
      <div class="column">
        <rune-search-component #searchComponent></rune-search-component>
        <div class="runes-wrapper">
          <rune-list-component [searchComponent]="searchComponent"></rune-list-component>
          <rune-page-component></rune-page-component>
        </div>
      </div>

    </section>
  `,
  styles: [`
    :host {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
    }

    rune-list-component,
    rune-page-component {
      display: flex;
    }
  `]
})
export class RunesComponent {}
