import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';
import {Http} from 'angular2/http';

import {RuneService} from '../../services/rune/rune.service';
import {MasteryService} from '../../services/mastery/mastery.service';


@Component({
  selector: 'import-component',
  directives: [FORM_DIRECTIVES, NgFor],
  template: `
    <form class="form-inline" (ngSubmit)="onSubmit()" #form="ngForm">
      <div class="form-group">
        <input class="form-control" type="text" placeholder="Summoner name"
          [(ngModel)]="summoner.name"
          ng-control="name"
          #name="ngForm"
          required>
      </div>
      <div class="form-group">
        <select class="form-control" [(ngModel)]="summoner.server" ng-control="server" #server="ngForm" required>
          <option *ngFor="#server of servers" [value]="server">{{ server | uppercase }}</option>
        </select>
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

          this.runeService.loadRunes(data.runes);
          // this.masteryService.loadMasteries(data.masteries);
        },
        (error) => {
          const err = error.json();

          alert(`${err.code}: ${err.message}`);
        },
        () => {

          // Callback after load.
          console.log('Done!')
        }
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
