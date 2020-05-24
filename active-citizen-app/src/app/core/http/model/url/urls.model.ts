export class Urls {
  public static get BaseUrl(): string { return 'active-citizen/api/' }

  // Gateway endpoints
  public static get Incidents(): string { return `${this.BaseUrl}/incidents`; }
  public static get Logging(): string { return `${this.BaseUrl}/logging`; }
  public static get Session(): string { return `${this.BaseUrl}/session`; }
  public static get Greeting(): string { return `${this.BaseUrl}/greeting`; }


  // External endpoints
}
