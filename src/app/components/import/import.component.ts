import {Component, FORM_DIRECTIVES, NgFor} from 'angular2/angular2';


@Component({
  selector: 'import-component',
  directives: [FORM_DIRECTIVES, NgFor],
  template: `
    <form class="form-inline" (ng-submit)="onSubmit()">
      <div class="form-group">
        <input class="form-control" type="text" placeholder="Summoner name" [(ng-model)]="summoner.name">

        <!-- TODO: remove later -->
        {{summoner.name}}
      </div>
      <div class="form-group">
        <select [(ng-model)]="summoner.server">
          <option *ng-for="#server of servers" [value]="server">{{ server | uppercase }}</option>
        </select>

        <!-- TODO: remove later -->
        {{summoner.server}}
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Load</button>
      </div>
    </form>
  `
})
export class ImportComponent {
  public summoner: Summoner = new Summoner();
  public servers: string[] = [
    'br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr'
  ];


  constructor(
    /* services goes here */
  ) { }

  onSubmit() {
    /* Complicated logic here */


    // Reset form.
    this.summoner.reset();
  }
}

class Summoner {
  constructor(
    public server: string = '',
    public name: string = ''
  ) { }

  reset(): void {
    this.server = this.name = '';
  }
}
