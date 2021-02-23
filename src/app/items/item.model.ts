export class Item {
  constructor(
    public id: number,
    public name: string,
    public sizes: string[],
    public description: string,
    public price: number,
    public currency: string,
    public image: string,
  ) {}
}
