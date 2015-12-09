export class Url {

  private _url: string = `https://${this._server}.api.pvp.net/api/lol/${this._server}/v1.4/summoner/`;

  constructor(
    private _server: string,
    private _name: string
  ) { }

  info(API_KEY: string) {
    return `${this._url}by-name/${this._name}` +
      `?api_key=${API_KEY}`;
  }

  asset(asset: string, id: number, API_KEY: string) {
    return `${this._url + id}/${asset}` +
      `?api_key=${API_KEY}`;
  }
}
