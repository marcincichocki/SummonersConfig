import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, Input} from 'angular2/angular2';

import {SelectDirective} from '../../directives/select.directive';
import {TooltipDirective} from '../../directives/tooltip.directive';


@Component({
  selector: 'page-name-component',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, SelectDirective, TooltipDirective],
  styles: [`
    .ng-valid[required] {
      border-left: 5px solid #42A948;
    }
    .ng-invalid {
      border-left: 5px solid #a94442 !important;
    }
  `],
  template: `
    <div class="row" *ng-if="!showInput">
      <div class="col-8 center-y">
        <h2 class="page-name"
          [tooltip]="{
            type: 'text',
            data: service.getName()
          }">{{ service.getName() }}</h2>
      </div>
      <div class="col-4">
        <button class="btn btn-block btn-primary"
          (click)="toggleInput()">Change</button>
      </div>
    </div>
    <div *ng-if="showInput">
      <form class="row" (ng-submit)="onSubmit()" #nf="form">
        <div class="col-8 form-group">
          <input class="form-control"
            type="text"
            [placeholder]="placeholder"
            [(ng-model)]="model.name"
            select
            ng-control="name"
            #name="form"
            required>
        </div>
        <div class="col-4 form-group">
          <input class="btn btn-block btn-primary" type="submit" value="Save"
            [disabled]="!nf.form.valid">
        </div>
      </form>
      <div class="row">
        <div class="col-offset-8 col-4">
          <button class="btn btn-block"
            (click)="toggleInput()">Close
          </button>
        </div>
      </div>
    </div>
  `
})
export class PageNameComponent {
  @Input() service;
  @Input() placeholder: string;

  private showInput: boolean = false;
  private model: Name = new Name();

  toggleInput() {
    this.showInput = !this.showInput;
  }

  setName(name: string): void {
    this.service.pages[this.service.active].name = name;
  }

  onSubmit() {
    this.setName(this.model.name);
    this.model.reset();
    this.toggleInput();
  }
}

class Name {
  constructor(public name: string = '') { }

  reset() {
    this.name = '';
  }
}
