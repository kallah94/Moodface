export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string,
    public langKey: string,
    public lastName: string,
    // Ajou champs
    public serviceName: string,
    public eepartementName: string,
    public plateauName: string,
    public login: string,
    public imageUrl: string
  ) {}
}
