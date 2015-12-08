/**
 * Basic page interface.
 * Every page will inherit from this one.
 * This means, every page must have name property.
 */
interface BasePage {
  name: string;
}


/**
 * Data structure for runes and mastery services.
 */
export class Pages<Page extends BasePage> {

  // Store active page
  private _active: number = 0;

  private _min: number = 0;
  private _max: number = 20;

  // Store information about each page.
  public pages: Page[] = [];

  // Get active page.
  get active(): number { return this._active; }

  // Get current page.
  get current(): Page { return this.pages[this._active]; }

  // Get size of pages array.
  get size(): number { return this.pages.length; }

  // Get name for next page.
  get name() { return `${this._name} #${this.size + 1}`; }


  // Set current page.
  set current(page: Page) { this.pages[this._active] = page; }


  constructor(
    private _Page: new (name: string) => Page,
    private _name: string
  ) { }


  /**
   * Check if given page exist.
   * @param  {number} pageIndex - Page index in this.pages array. Zero-based.
   * @return {boolean}
   */
  exist(pageIndex: number): boolean {
    return (pageIndex >= 0) && (pageIndex < this.size);
  }


  /**
   * Add new page.
   * @param {string} [name=this.name] - Name of page.
   */
  addPage(name: string = this.name): void {

    // Continue only if there is a space for new page.
    if (this.size < this._max) {

      // Add new page.
      this.pages.push(new this._Page(name));

      // Change page to just created.
      this.changePage(this.size - 1);
    }
  }


  /**
   * Remove page.
   * @param  {number} [pageIndex=this._active] - Page index in this.pages
   * array. Zero-based.
   */
  removePage(pageIndex: number = this._active): void {

    // Continue only if there is page to be removed.
    if (this.size > this._min) {

      // Remove page.
      this.pages.splice(pageIndex, 1);

      // Change page to first.
      this.changePage();
    }
  }


  /**
   * Change active page to given id.
   * @param  {number} [pageIndex=this._min] - Page index in this.pages
   * array. Zero-based.
   */
  changePage(page: number = this._min): void {
    if (this.exist(page)) {
      this._active = page;
    }
  }


  /**
   * Resets current page, but keeps the name
   */
  clearPage(): void {
    this.current = new this._Page(this.getName());
  }


  /**
   * Get name of given pageIndex
   * @param  {number} [pageIndex=this._active] - Page index in this.pages
   * array. Zero-based.
   * @return {string} Page name.
   */
  getName(pageIndex: number = this._active): string {
    return this.pages[pageIndex].name;
  }
}
