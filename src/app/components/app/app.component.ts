import {Component, OnInit} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Routes, APP_ROUTES} from '../../routes/route.config';
import {RuneService} from '../../services/rune/rune.service';
import {MasteryService} from '../../services/mastery/mastery.service';
import {TooltipComponent} from '../tooltip/tooltip.component';


@Component({
    selector: 'app-component',
    template: `
      <div class="container">
        <header class="row main-header center-y">
          <div class="col-4">
            <h1 class="logo">Summoner's Config</h1>
          </div>
          <div class="col-8">
            <nav>
              <a class="btn" [router-link]="['/' + routes.home.as]">Home</a>
              <a class="btn" [router-link]="['/' + routes.runes.as]">Runes</a>
              <a class="btn" [router-link]="['/' + routes.masteries.as]">Masteries</a>
            </nav>
          </div>
        </header>
        <main class="row main-content">
          <router-outlet></router-outlet>
        </main>
        <tooltip-component></tooltip-component>
      </div>
    `,
    directives: [ROUTER_DIRECTIVES, TooltipComponent]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
  public routes = Routes;
  constructor(
    public runeService: RuneService,
    public masteryService: MasteryService
  ) { }

  ngOnInit() {
    this.runeService.getRunes();
    this.masteryService.getMasteries();
  }
}
