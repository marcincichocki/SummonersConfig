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
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
  `]
})
export class HomeComponent { }
