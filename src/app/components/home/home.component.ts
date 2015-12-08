import {Component} from 'angular2/angular2';

import {ImportComponent} from '../import/import.component';


@Component({
  selector: 'home-component',
  directives: [ImportComponent],
  template: `
    <import-component></import-component>
  `
})
export class HomeComponent { }
