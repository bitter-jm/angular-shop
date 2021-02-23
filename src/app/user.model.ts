export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public expirationDate: Date,
  ) {}

  get token() {
    if (!this.expirationDate || new Date() > this.expirationDate) {
      return null;
    }
    return this._token;
  }
}
