import {Component, FORM_DIRECTIVES, NgFor} from 'angular2/angular2';
import {Http} from 'angular2/http';

import {RuneService} from '../../services/rune/rune.service';
import {MasteryService} from '../../services/mastery/mastery.service';


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
    public http: Http,
    public runeService: RuneService,
    public masteryService: MasteryService
  ) { }

  onSubmit() {
    this.http.get(`../${this.summoner.server}/${this.summoner.name}`)
      .subscribe(
        (res) => {
          const data = res.json();

          /* Complicated logic here */
        },
        (error) => console.error(error),
        () => console.log('Done!')
      );


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
