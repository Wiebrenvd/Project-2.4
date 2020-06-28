export class Ingredient {

  constructor(
    public id: number,
    public name: string,
    public amount: string
  ) {
  }

  setAmount(amount: string) {
    this.amount = amount;
  }


}
