import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

import {Pages} from '../Pages';
import {Page} from './Page';
import {TooltipService} from '../tooltip/tooltip.service';


@Injectable()
export class MasteryService extends Pages<Page> {

  // Object which contains grid of masteries.
  public grid: any;

  // Object which contains every mastery.
  public masteries: any;

  // List of categories.
  public categories: string[] = [
    'Ferocity',
    'Resolve',
    'Cunning'
  ];


  /**
   * Constructor function.
   */
  constructor(
    public http: Http,
    public tooltipService: TooltipService
  ) {

    // Create data structure.
    super(Page, 'Mastery Page');

    // By defaut, create one page.
    this.addPage();
  }


  /**
   * Load masteries and save into variables.
   */
  getMasteries() {
    this.http.get('./app/data/en/masteries.json')
      .subscribe(
        res => {
          // TODO: Use .map()
          const data = res.json();

          // TODO: change to properties after upgrading to
          // alpha 49(somebody changed response to be an Object not any).
          this.grid = data['grid'];
          this.masteries = data['masteries'];
        },
        error => console.log(error)
      );
  }

  /**
   * FIXME: Param pages should be of type Page, but it does not have current
   * property. Need to update Page class to contain this prop and Pages class
   * to utilize this functionality.
   *
   * Load masteries from array of pages. Pass data directly from riot api to
   * this function to load masteries.
   * @param {any[]} pages - Array of pages.
   */
  loadMasteries(pages: any[]): void {

    // Active page.
    let current = 0;

    // Reset pages.
    this.pages = [];

    // For each given page:
    pages.forEach((page, index) => {

      // Add new one.
      this.addPage();

      // Update active masteries.
      this.current.masteries = page.masteries;

      // Update name.
      this.current.name = page.name;

      // Get ranks.
      this.current.rank = page.masteries
        .reduce((rank, el) => { rank[el.id] = el.rank; return rank; }, {});

      // Updated sums.
      this.current.sums.forEach((el, index) => {
        this.current.sums[index] = page.masteries
          .filter((mastery) => parseInt(mastery.id.toString().slice(1, 2), 10) === (index + 1))
          .reduce((sum, mastery) => sum + mastery.rank, 0);
      });

      // Update available points.
      this.current.max -= this.current.sums.reduce((sum, next) => sum + next, 0);

      // Check if current page sohuld be active.
      if (page.current) current = index;
    });

    // Change active page to current.
    this.changePage(current);
  }


  /**
   * Get category and row based for given mastery id.
   * @param {number} id - unique mastery id.
   * @return {Object} - Object which contains category and row properties.
   */
  getInfo(id: number): {category: number, row: number} {
    return {
      category: parseInt(id.toString().slice(1, 2), 10),
      row: parseInt(id.toString().slice(2, 3), 10)
    }
  }


  /**
   * Add new point for given mastery id.
   * @param {number} id - Unique mastery id.
   */
  addMastery(id: number): void {

    // Get category and row of mastery.
    const {category, row} = this.getInfo(id);

    // Continue only if it is possible to add point.
    if (this.masteryCheckUp(id, category, row)) {

      // Add/update mastery.
      this.current.addMastery(id, category);

      // Refresh tooltip.
      this.updateTooltip(id);
    }
  }


  /**
   * Remove point for given mastery id.
   * @param {number} id - Unique mastery id.
   */
  removeMastery(id: number): void {

    // Get category and row of mastery.
    const {category, row} = this.getInfo(id);

    // Continue only if it is possible to remove point.
    if (this.masteryCheckDown(id, category, row)) {

      // Remove/update mastery.
      this.current.removeMastery(id, category);

      // Refresh tooltip.
      this.updateTooltip(id);
    }
  }


  /**
   * Check if it is possible to add new point for given mastery id.
   * @param  {number} id - Unique mastery id.
   * @param  {number} [category] - Category id for given mastery id.
   * @param  {number} [row] - Row id for given mastery id.
   * @return {boolean} Return true if mastery is possible to add,
   * false otherwise.
   */
  masteryCheckUp(id: number, category?: number, row?: number): boolean {

    /**
     * Get category and row of given mastery id, if category either row
     * are not numbers(this also works if they are not defined at all).
     */
    if (isNaN(category) || isNaN(row)) {

      // var because block scope.
      var {category, row} = this.getInfo(id);
    }


    /**
     * Here is how mastery enabling works.
     *
     * First, check if max available points for current page are more then 0.
     * Max points are capped at 30(or summoner level) and decrement by one
     * for each mastery point added.
     *
     * Second, check if sum of points in given row and category are less then
     * max(5 for odd, 1 for even).
     */
    if (this.current.max > 0 && !this.isMaxed(category, row)) {

      /**
       * Only then check if the row is NOT 1st and previous row is maxed
       * or the row is 1st.
       */
      if ((row !== 1 && this.isMaxed(category, row - 1)) || row === 1) {

        // If both cases are fulfilled, return true.
        return true;
      }
    }

    // Otherwise return false.
    return false;
  }


  /**
   * Check if it is possible to remove point for given mastery id.
   * @param  {number} id - Unique mastery id.
   * @param  {number} category - Category id for given mastery id.
   * @param  {number} row - Row id for given mastery id.
   * @return {boolean} Return true if mastery is possible to remove,
   * false otherwise.
   */
  masteryCheckDown(id: number, category: number, row: number): boolean {

    /**
     * Return true only if given statments are true:
     * 1. Max available points for current page are not more then max
     * overall(or summoner level).
     * 2. Rank of mastery for given mastery id is more then 0.
     * 3. Sum of next row is equal 0(there is no points added).
     */
    if (
      this.current.max < 30
      && this.current.rank[id] > 0
      && this.rowSum(category, row + 1) === 0
    ) {
      return true;
    }

    // Otherwise return false.
    return false;
  }


  /**
   * Check if given row in given category is maxed.
   * @param  {number} category - Category id for given mastery id.
   * @param  {number} row - Row id for given mastery id.
   * @return {boolean} Return true if row is maxed, false otherwise.
   */
  isMaxed(category: number, row: number): boolean {

    // Boolean value which determine if row is even or odd.
    const even = this.isEven(row);

    // Sum of given row.
    const rowSum = this.rowSum(category, row);


    // Check if sum is equal to 1(even) or 5(odd).
    return even ? rowSum === 1 : rowSum === 5;
  }


  /**
   * Get sum of points in given row id and category id.
   * @param  {number} category - Category id for given mastery id.
   * @param  {number} row - Row id for given mastery id.
   * @return {number} Sum of distributed points in given category and row or 0.
   */
  rowSum(category: number, row: number): number {

    // Take current active masteries.
    return this.current.masteries

      // Filter those which does not match given category and row.
      .filter(mastery => {
        const {category: c, row: r} = this.getInfo(mastery.id);
        return category === c && row === r;
      })

      // Get array of ranks.
      .map(mastery => mastery.rank)

      // Get sum of ranks or 0.
      .reduce((a, b) => a + b, 0);
  }


  /**
   * Update tooltip after updating mastery.
   * @param  {number} id - Unique mastery id.
   */
  updateTooltip(id: number): void {
    this.tooltipService.show({
      type: 'mastery',
      data: {
        mastery: this.masteries[id],
        rank: this.current.rank[id]
      }
    });
  }

  /**
   * Check if given number is even.
   * @param  {number} n - Number which will be checked.
   * @return {boolean} - Boolean value which will determine if `n` is even.
   */
  isEven(n: number): boolean {
    return n % 2 === 0;
  }
}
