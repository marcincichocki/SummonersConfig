import {Injectable} from 'angular2/core';

import {Tooltip} from './tooltip';


@Injectable()
export class TooltipService {
  private spaceX: number = 20;
  private spaceY: number = 20;
  private width: number = 0;
  private height: number = 0;
  private padding: number = 20;

  public tooltip: Tooltip = null;
  public x: number = 0;
  public y: number = 0;

  show(tooltip: Tooltip) {
    this.tooltip = tooltip;

    /**
     * This is a hack, not actual solution. Browser will "wait" until
     * stack is empty to get element. That means, angular will have an
     * opportunity to create and insert element to the DOM(*ngSwitch).
     */
    setTimeout(() => {
      const tooltip: HTMLElement = document.getElementById('tooltip');

      this.height = tooltip.clientHeight;
      this.width = tooltip.clientWidth;
    }, 0);
  }

  hide() {
    this.tooltip = null;
  }

  follow(event: MouseEvent) {
    const {x, y} = this.inViewport(event.clientX, event.clientY);

    this.x = x ? event.clientX - this.width - this.spaceX : event.clientX + this.spaceX;
    this.y = y ? event.clientY - this.height - this.spaceY : event.clientY + this.spaceY;
  }

  inViewport(x, y) {
    return {
      x: x + this.width + this.spaceX > window.innerWidth - this.padding,
      y: y + this.height + this.spaceY > window.innerHeight - this.padding
    }
  }
}
