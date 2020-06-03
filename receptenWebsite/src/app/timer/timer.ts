export class Timer {
  constructor(
    public id: number,
    public seconds: number) {
  }



  getId(): number {
    return this.id;
  }

  getSeconds(): number {
    return this.seconds;
  }
}
