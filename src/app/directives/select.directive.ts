import {Directive, ElementRef} from 'angular2/core';


@Directive({
  selector: '[select]'
})
export class SelectDirective {
  constructor(public el: ElementRef) {
    this.el.nativeElement.select();
  }
}
