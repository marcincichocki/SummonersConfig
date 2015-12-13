import {Directive} from 'angular2/core';

import {TooltipService} from '../services/tooltip/tooltip.service';


@Directive({
  selector: '[tooltip]',
  inputs: [
    'tooltip: tooltip'
  ],
  host: {
    '(mouseenter)': 'tooltipService.show(tooltip)',
    '(mousemove)': 'tooltipService.follow($event)',
    '(mouseleave)': 'tooltipService.hide()'
  }
})
export class TooltipDirective {
  constructor(public tooltipService: TooltipService) { }
}
