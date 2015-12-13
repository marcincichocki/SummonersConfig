import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {RuneService} from '../../services/rune/rune.service';


@Component({
  selector: 'rune-ip-time-component',
  template: `
    <div class="row">
      <div class="col-6">
        <h3>Average time</h3>
        <p>{{ countTime() }}</p>
      </div>
      <div class="col-6">
        <h3>Overall ip</h3>
        <p>{{ ip }}</p>
      </div>
    </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class RuneIpTimeComponent {
  // seconds
  private gameTime: number = 2084;
  private ipPerWin: number = 97.7;
  private ipPerLose: number = 65.1;
  private winRatio: number = 50;
  private loseRatio: number = 100 - this.winRatio;
  public ip: number = 0;
  constructor(public runeService: RuneService)  {

  }

  format(n: number) {
    return n > 9 ? n.toString() : `0${n}`;
  }

  countTime() {
    this.ip = this.runeService.current.ip;
    const ipPerGame = parseFloat((((this.ipPerWin * this.winRatio) + (this.ipPerLose * this.loseRatio)) / 100).toFixed(2));
    const gamesQuantity = this.ip / ipPerGame;

    const time = Math.floor(this.gameTime * gamesQuantity);
    const days = Math.floor(time / 3600 / 24);
    const hours = this.format(Math.floor((time / 3600) % 24));
    const minutes = this.format(Math.floor((time / 60) % 60));
    const seconds = this.format(Math.floor(time % 60));



    return `${days} day(s) and ${hours}:${minutes}:${seconds}`;
  }
}
