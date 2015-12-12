import {Injectable} from 'angular2/core';

import {Tooltip} from './tooltip';


@Injectable()
export class TooltipService {
  private offsetX: number = 20;
  private offsetY: number = 20;
  private width: number = 250;
  private height: number = 200;

  public tooltip: Tooltip = null;
  public x: number = 0;
  public y: number = 0;
  public translateX = false;
  public translateY = false;

  show(tooltip: Tooltip) {
    this.tooltip = tooltip;
  }

  hide() {
    this.tooltip = null;
  }

  // TODO: Make tooltip change position near the "walls"(viewport).
  // UPDATE: hotfix implemented, still need fixing but now does not
  // break the app.
  follow(event: MouseEvent) {
    this.x = event.pageX + this.offsetX;
    this.y = event.pageY + this.offsetY;

    const vp = this.inViewport(event.pageX, event.pageY);
    this.translateX = vp.x;
    this.translateY = vp.y;
  }

  inViewport(x, y) {
    return {
      x: x + this.width + this.offsetX > window.innerWidth,
      y: y + this.height + this.offsetY > window.innerHeight
    }
  }
}
