import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

import {Pages} from '../Pages';
import {Page} from './Page';
import {Slot} from './Slot';
import {UniqueRune} from './UniqueRune';
import {STATIC_DATA_STATS, STATIC_DATA_RUNES} from './staticData';


@Injectable()
export class RuneService extends Pages<Page> {

  // types of runes.
  public types: string[] = [
    'mark',
    'seal',
    'glyph',
    'quintessence'
  ];

  // Object which contains unitId: unit pairs
  public stats: STATIC_DATA_STATS = {};

  // Object which contains every rune.
  public runes: STATIC_DATA_RUNES = {};


  constructor(public http: Http) {
    super(Page, 'Rune Page');
    this.addPage();
  }


  /**
   * Load runes and save in variables.
   */
  getRunes() {
    this.http.get('./app/data/en/runes.json')
      .subscribe(
        res => {
          // TODO: Use .map()
          const data = res.json();

          this.stats = data.stats;
          this.runes = data.runes;
        },
        error => console.log(error)
      );
  }


  /**
   * FIXME: Param pages should be of type Page, but it does not have current
   * property. Need to update Page class to contain this prop and Pages class
   * to utilize this functionality.
   *
   * Load runes from array of pages. Pass data directly from riot api to
   * this function to load runes.
   * @param {any[]} pages - Array of pages.
   */
  loadRunes(pages: any[]): void {

    // Active page.
    let current = 0;

    // Reset pages.
    this.pages = [];

    // For each given page:
    pages.forEach((page, index) => {

      // Add new one.
      this.addPage();

      // Update slots.
      this.current.slots = page.slots;

      // Update name.
      this.current.name = page.name;

      // Count sums and ip.
      this.count();

      // Update counters.
      if (page.slots.length === 30) {
        this.current.counter = [0, 0, 0, 0];
      } else {
        page.slots.forEach(slot => {
          this.current.counter[this.getTypeId(slot.runeId)] -= 1;
        });
      }

      // Check if current page sohuld be active.
      if (page.current) current = index;
    });

    // Change active page to current.
    this.changePage(current);
  }


  /**
   * Add rune(s) of given id.
   * @param {number} id - Id of rune.
   * @param {number} [options] - Optional settings.
   * @param {boolean} [options.count] - Update sums after adding rune.
   * @param {number} [options.ammount] - Ammount of same runes to be added.
   * @param {boolean} [options.max] - Add maximum of runes possible. Overrides
   * options.ammount.
   * @param {number[]} [options.slotIds] - Array of slots which will be used.
   * Array length do not have to be equal to ammount runes to add, however
   * if slot is falsy or array os not defined at all, slots will be auto
   * generated
   */
  addRune(id: number, options?: {count?: boolean, ammount?: number, max?: boolean, slotIds?: number[]}): void {
    const typeId: number = this.getTypeId(id);
    const maxCounter = this.current.counter[typeId];

    const defaults: {count: boolean, ammount: number, max: boolean, slotIds: number[]} = Object.assign({
      count: true,
      ammount: 1,
      max: false,
      slotIds: []
    }, options);

    // Is there a room for this rune?
    if ( (maxCounter > 0) && (defaults.ammount <= maxCounter) ) {

      if (defaults.max) defaults.ammount = maxCounter;

      // Add new rune
      this.current.addRune(new Slot(id), typeId, defaults.ammount, defaults.slotIds);

      // update sums
      if (defaults.count) this.count();
    }
  }


  /**
   * Remove rune from given slot.
   * @param {Slot} slot - Shot which will be removed.
   * @param {boolean} [max=false] - Remove all same runes(same runeId).
   */
  removeRune(slot: Slot, max: boolean = false): void {
    const typeId: number = this.getTypeId(slot.runeId);

    if (this.current.slots.length) {
      this.current.removeRune(slot, typeId, max);

      this.count();
    }
  }


  /**
   * Get stats for unique ids and ammount of them in rune page.
   */
  count() {

    // Get list of unique ids.
    const uniqueIds: number[] = this.current.slots
      .map(slot => slot.runeId)
      .filter((id, index, self) => self.indexOf(id) === index);

    // Prepare array to store unique runes.
    const runes: UniqueRune[] = [];


    // For each unique id add new unique rune.
    uniqueIds.forEach(id => {
      const rune = new UniqueRune(

        // Ip cost of specyfic rune.
        this.runes[id].ip,

        // Stats of specyfic rune.
        this.runes[id].stats,

        // quantity of exactly same runes.
        this.current.slots.filter(slot => slot.runeId === id).reduce(a => a + 1, 0)
      );


      runes.push(rune);
    });


    // Call specyfic method to generate sums.
    this.current.count(runes);
  }


  /**
   * Get type id of given rune id.
   * @param  {number} id - Id of rune.
   * @return {number} Numerical representation of type.
   */
  getTypeId(id: number): number {
    return this.types.indexOf(this.runes[id].type);
  }


  /**
   * Display "%" if unitId includes string "Percent"
   * @param {string} unitId - Specyfic unitId of rune.
   * @return {string}
   */
  isPercentage(unitId: string): string {
    return /Percent/.test(unitId) ? '%' : '';
  }
}
