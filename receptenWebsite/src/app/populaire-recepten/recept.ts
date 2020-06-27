export class Recept {

  clicks: number;

  constructor(
    public id: number,
    public name: string) {
  }

  setClicks(clicks: number) {
    this.clicks = clicks;
  }

}
