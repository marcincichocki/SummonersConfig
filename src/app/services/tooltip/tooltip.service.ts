import {Injectable} from 'angular2/core';

import {Tooltip} from './tooltip';


@Injectable()
export class TooltipService {

  // Defines the space between mouse cursor and a tooltip on x-axis in pixels.
  private spaceX: number = 20;

  // Defines the space between mouse cursor and a tooltip on y-axis in pixels.
  private spaceY: number = 20;

  // Stores real width of tooltip.
  private width: number = 0;

  // Stores real height of tooltip.
  private height: number = 0;

  // Defines space between max tooltip position in both axis and
  // window demisions in pixels.
  private padding: number = 20;


  // Stores tooltip data.
  public tooltip: Tooltip = null;

  // Tooltip's left position relative to window.
  public x: number = 0;

  // Tooltip's top position relative to window.
  public y: number = 0;


  /**
   * Load given data to tooltip and displays it.
   * @param {Tooltip} tooltip - Data to be displayed.
   */
  show(tooltip: Tooltip): void {
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


  /**
   * Hides tooltip and remove data.
   */
  hide(): void {
    this.tooltip = null;
  }


  /**
   * Set x and y properties of tooltip.
   * @param {MouseEvent} event - Mouse event needed to display
   * tooltip in right place.
   */
  follow(event: MouseEvent): void {

    // Get values that determine which axis are fully visible in viewport.
    const {x, y} = this.inViewport(event.clientX, event.clientY);

    this.x = x ? event.clientX - this.width - this.spaceX : event.clientX + this.spaceX;
    this.y = y ? event.clientY - this.height - this.spaceY : event.clientY + this.spaceY;
  }


  /**
   * Determines which axis are fully visible in viewport.
   * @param {number} x - Mouse position on x-axis relative to window.
   * @param {number} y - Mouse position on y-axis relative to window.
   * @return {Object}
   */
  inViewport(x: number, y: number): {x: boolean, y: boolean} {
    return {
      x: x + this.width + this.spaceX > window.innerWidth - this.padding,
      y: y + this.height + this.spaceY > window.innerHeight - this.padding
    }
  }
}
