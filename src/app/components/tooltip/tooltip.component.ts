import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

import {TooltipService} from '../../services/tooltip/tooltip.service';
import {TooltipRuneComponent} from '../tooltipRune/tooltipRune.component';
import {TooltipRuneSumsComponent} from '../tooltipRuneSums/tooltipRuneSums.component';
import {TooltipMasteryComponent} from '../tooltipMastery/tooltipMastery.component';
import {TooltipMasterySumsComponent} from '../tooltipMasterySums/tooltipMasterySums.component';


@Component({
  selector: 'tooltip-component',
  templateUrl: './app/components/tooltip/tooltip.component.html',
  directives: [
    CORE_DIRECTIVES,
    TooltipRuneComponent,
    TooltipRuneSumsComponent,
    TooltipMasteryComponent,
    TooltipMasterySumsComponent
  ]
})
export class TooltipComponent {
  constructor(public service: TooltipService) { }
}
