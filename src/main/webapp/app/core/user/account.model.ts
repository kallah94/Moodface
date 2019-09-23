export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string,
    public langKey: string,
    public lastName: string,
    public serviceName: string, // Ajout champs serviceName
    public departementName: string, // Ajout champs departementName
    public login: string,
    public imageUrl: string
  ) {}
}
