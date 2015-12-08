import {HomeComponent} from '../components/home/home.component';
import {RunesComponent} from '../components/runes/runes.component';
import {MasteriesComponent} from '../components/masteries/masteries.component';


export var Routes = {
  home: {
    path: '/',
    as: 'Home',
    component: HomeComponent
  },
  runes: {
    path: '/runes',
    as: 'Runes',
    component: RunesComponent
  },
  masteries: {
    path: '/masteries',
    as: 'Masteries',
    component: MasteriesComponent
  }
}

export const APP_ROUTES = Object.keys(Routes).map(prop => Routes[prop]);
