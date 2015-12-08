import {Sum} from './Sum';
import {Slot} from './Slot';
import {UniqueRune} from './UniqueRune';

/** Class representing a rune page. */
export class Page {

  /**
   * TODO: Change(or not) class properties to public/private/static
   */

  // Store ip sum of all runes in the current page.
  // RuneService.count() updates this property.
  public ip: number = 0;

  // Store every slot in page(Slot instances).
  public slots: Slot[] = [];

  // Store calculated values with unitIds of all runes in page.
  public sums: Sum[] = [];

  // FIXME: This should be private property.
  //
  // Store ammount of maximum available runes to add in respective types.
  //
  // this.counter[0] => "mark", max 9
  // this.counter[1] => "seal", max 9
  // this.counter[2] => "glyph", max 9
  // this.counter[3] => "quintessence", max 3
  public counter: number[] = [9, 9, 9, 3];

  // FIXME: This should be static property.
  //
  // Store runes first slot information for respective types. Slot is 1-based.
  //
  // this.slotStart[0] => "mark" starts at slot number 1
  // this.slotStart[0] => "seal" starts at slot number 10, and so on..
  private slotStart: number[] = [1, 10, 19, 28];


  /**
   * Create a page.
   * @constructor
   * @param {string} name - Name of rune page.
   */
  constructor(public name: string) { }


  /**
   * Get first available slot for given typeId
   * @param {number} typeId - Number representing type.
   * @param {number[]} [unofficial=[]] - Array of rune slot ids that will
   * be added, but are not yet in this.slots.
   * @returns {(number | boolean)} Slot number 1-based
   */
  getSlot(typeId: number, unofficial: number[] = []): number {

    // Get starting position.
    const from: number = this.slotStart[typeId];

    // Get finishing position.
    const to = from + 9 < 30 ? from + 9 : 30;

    // Get array of taken rune slots.
    const slots: number[] = this.slots.map(rune => rune.runeSlotId).concat(unofficial);


    // Loop through all slots for specyfic typeId.
    for (let i = from; i <= to; i += 1) {

      // If slot does not exist in array, return slot.
      if (slots.indexOf(i) === -1) return i;
    }
  }

  /**
   * Check if rune slot id in null.
   * @param  {number | void} runeSlotId - Slot of rune.
   * @return {boolean} Value describing if slot is null.
   */
  checkSlot(runeSlotId: number | void): boolean {
    return runeSlotId === null;
  }

  /**
   * Update counter and add slot to this.slots array.
   * @param {Slot} slot - Slot which will be added.
   * @param {string} slot.runeId - unique id of a rune.
   * @param {number | void} [rune.runeSlotId=null] - Unique slot which
   * rune will be placed in.
   * @param {number} typeId - Number representing type.
   * @param {number} [ammount=1] - Ammount of runes to add.
   */
  addRune(slot: Slot, typeId: number, ammount: number = 1, slotIds: number[]): void {

    // Decrease counter by ammount of runes to add.
    this.counter[typeId] -= ammount;

    // Adding multiple slots at once.
    if (ammount > 1) {

      // create array of slots to add.
      const slots: Slot[] = new Array(ammount).fill(slot);

      // Update each rune slot id if null.
      if (this.checkSlot(slot.runeSlotId)) {
        slots.forEach((slot, index, thisArr) => {
           thisArr[index] = new Slot(
             slot.runeId,
             slotIds[index] || this.getSlot(typeId, thisArr.map(slot => slot.runeSlotId).filter(Boolean))
           );
        });
      }

      // Add new slots.
      Array.prototype.push.apply(this.slots, slots);
    } else {
      // Add just one slot.

      // Set rune slot id if null.
      if (this.checkSlot(slot.runeSlotId)) slot.runeSlotId = this.getSlot(typeId);

      // Add new slot.
      this.slots.push(slot);
    }
  }


  /**
   * Update counter and remove rune from this.runes array.
   * @param {Slot} slot - Slot which will be removed.
   * @param {string} slot.runeId - Unique id of a rune.
   * @param {number} slot.runeSlotId - Unique slot id.
   * @param {number} typeId - Number representing type.
   * @param {boolean} max - Remove all runes with given id.
   */
  removeRune(slot: Slot, typeId: number, max: boolean): void {
    const runes = max ? this.slots.filter(s => s.runeId !== slot.runeId) : this.slots.filter(s => s !== slot);

    this.counter[typeId] += this.slots.length - runes.length;
    this.slots = runes;
  }


  /**
   * Generate sums of current page.
   * @param {UniqueRune[]} runes [description]
   * @param {number} runes[].ip - Ip const of single rune
   * @param {*} runes[].stats - Object which contain unit: <Number>value paris.
   * @param {number} runes[].ammount - Quantity of exactly same runes.
   */
  count(runes: UniqueRune[]): void {

    // Reset array.
    this.sums = [];

    // Get sum of ip.
    this.ip = runes.reduce((sum, rune) => sum + (rune.ip * rune.ammount), 0);

    runes.forEach(rune => {

      // Some runes may give more then one stat. For example
      // Greater Mark of Hybrid Penetration gives both Armor Penetration and
      // Magic Penetration.
      Object.keys(rune.stats).forEach(unitId => {

        // Regeneration stats are in fact per second, not per 5 seconds
        // like description says.
        const fix = /Regeneration/.test(unitId) ? 5 : 1;
        const value: number = parseFloat((rune.stats[unitId] * rune.ammount * fix).toFixed(2));
        const index: number = this.sums.map(sum => sum.unitId).indexOf(unitId);

        // If stat alredy is in array then add values, otherwise create new
        // sum with new stat and initial value.
        if (index > -1) {
          this.sums[index].value = parseFloat((this.sums[index].value + value).toFixed(2));
        } else {
          this.sums.push(new Sum(unitId, value));
        }
      });
    });
  }
}
