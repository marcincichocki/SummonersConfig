import {Mastery} from './Mastery';


export class Page {
  public sums: number[] = [0, 0, 0];
  public max: number = 30;
  public masteries: Mastery[] = [];
  public rank: any = {};
  constructor(public name: string) { }


  addMastery(id: number, category: number) {
    const mastery = this.masteries.filter(mastery => mastery.id === id)[0];

    if (typeof mastery === 'undefined') {
      this.masteries.push(new Mastery(id, 1));
      this.rank[id] = 1;
    } else {
      this.updateMastery(1, mastery);
    }

    this.updateCounters(1, category);
  }

  removeMastery(id: number, category: number) {
    const mastery = this.masteries.filter(mastery => mastery.id === id)[0];

    if (mastery.rank > 1) {
      this.updateMastery(-1, mastery);
    } else {
      const index = this.masteries.indexOf(mastery);

      this.masteries.splice(index, 1);
      delete this.rank[id];
    }

    this.updateCounters(-1, category);
  }

  updateCounters(ammount: number, category: number): void {
    this.sums[category - 1] += ammount;
    this.max -= ammount;
  }

  updateMastery(ammount:number, mastery: Mastery): void {
    mastery.rank += ammount;
    this.rank[mastery.id] += ammount;
  }
}
