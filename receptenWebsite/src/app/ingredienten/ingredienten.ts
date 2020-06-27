export class Ingredient {
  public amount: string;

  constructor(
    public id: number,
    public name: string, amount: any) {
  }

  setAmount(amount: string) {
    this.amount = amount;
  }

}
