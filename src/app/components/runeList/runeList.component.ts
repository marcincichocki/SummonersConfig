import {Component, Input} from 'angular2/core';
import {NgFor, NgClass} from 'angular2/common';

import {RuneService} from '../../services/rune/rune.service';
import {SearchPipe} from '../../pipes/search.pipe';
import {Filter} from '../../pipes/filter.pipe';
import {RuneListItemComponent} from '../runeListItem/runeListItem.component';
import {TooltipDirective} from '../../directives/tooltip.directive';


@Component({
  selector: 'rune-list-component',
  pipes: [SearchPipe, Filter],
  templateUrl: './app/components/runeList/runeList.component.html',
  directives: [NgFor, NgClass, RuneListItemComponent, TooltipDirective]
})
export class RuneListComponent {
  @Input('searchComponent') search;

  private show: boolean[] = [false, false, false, false];
  private types: RunesByType[] = [];

  constructor(public runeService: RuneService) {
    const runes: Rune[] = Object.keys(this.runeService.runes).map(key => this.runeService.runes[key]);

    this.runeService.types.forEach(type => {
      this.types.push(new RunesByType(
        type,
        runes.filter(rune => rune.type === type)
      ));
    });
  };

  toggle(id: number): void {
    this.show[id] = !this.show[id];
  }

  addRune(event: MouseEvent, id: number): void {
    if (event.ctrlKey) {
      this.runeService.addRune(id, {
        max: true
      });
    } else {
      this.runeService.addRune(id);
    }
  }
}


// rune from runes.json
interface Rune {
  id: string,
  name: string,
  description: string,
  tier: number,
  image: string,
  primary: string,
  type: string,
  available: boolean,
  ip: number,
  tags: string[],
  stats: any
}

class RunesByType {
  constructor(
    public name: string,
    public runes: Rune[]
  ) { }
}
