import {Pipe} from 'angular2/angular2';


@Pipe({
  name: 'filter',
  pure: true
})
export class Filter {
  transform(arr, [prop, value]: [string, any]) {
    if ( (typeof value === 'string') || (typeof value === 'boolean')  ) {
      return arr.filter(obj => obj[prop] === value);
    } else if (Array.isArray(value)) {
      return arr.filter(obj => value.indexOf(obj[prop]) > -1);
    }
  }
}
