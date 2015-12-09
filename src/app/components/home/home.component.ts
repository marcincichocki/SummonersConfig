import {Component} from 'angular2/angular2';

import {ImportComponent} from '../import/import.component';


@Component({
  selector: 'home-component',
  directives: [ImportComponent],
  template: `
    <import-component></import-component>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  `]
})
export class HomeComponent { }
