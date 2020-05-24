export class NavItem {
  constructor(
    public readonly title: string,
    public readonly link?: string,
    public readonly children?: NavItem[]) { }
}
