import {Component, FORM_DIRECTIVES, NgFor} from 'angular2/angular2';


@Component({
  selector: 'import-component',
  directives: [FORM_DIRECTIVES, NgFor],
  template: `
    <form class="form-inline" (ng-submit)="onSubmit()" #form="form">
      <div class="form-group">
        <input class="form-control" type="text" placeholder="Summoner name"
          [(ng-model)]="summoner.name"
          ng-control="name"
          #name="form"
          required>

        <!-- TODO: remove later -->
        {{summoner.name}}
      </div>
      <div class="form-group">
        <select [(ng-model)]="summoner.server" ng-control="server" #server="form" required>
          <option *ng-for="#server of servers" [value]="server">{{ server | uppercase }}</option>
        </select>

        <!-- TODO: remove later -->
        {{summoner.server}}
      </div>
      <div class="form-group">
        <input class="btn btn-primary" type="submit" value="Load" [disabled]="!form.form.valid">
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
