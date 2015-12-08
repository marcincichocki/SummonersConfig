import {bootstrap} from 'angular2/angular2';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import {AppComponent} from './components/app/app.component';
import {RuneService} from './services/rune/rune.service';
import {TooltipService} from './services/tooltip/tooltip.service';
import {MasteryService} from './services/mastery/mastery.service';


bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_BINDINGS,
  RuneService,
  MasteryService,
  TooltipService
]).catch(error => console.log(error));
