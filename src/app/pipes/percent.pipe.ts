import {Pipe} from 'angular2/core';


@Pipe({
  name: 'percent',
  pure: true
})
export class Percent {
  transform(unitId: string) {
    return /Percent/.test(unitId) ? '%' : '';
  }
}
