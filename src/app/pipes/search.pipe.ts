import {Pipe} from 'angular2/core';


// TODO: async observable search
@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe {
  transform(value, [fields, query]: [string[], string]) {
    const rx = new RegExp(query, 'i');

    // RegExp.prototype.test converts everything to sting
    // including arrays. For example: ['asd', 1, 'foo'] -> 'asd,1,foo'.
    //
    // This is why array does not break this code. Need to refactor if comas
    // will be a problem.
    return value.filter(item => fields.some(field => rx.test(item[field])));
  }
}
