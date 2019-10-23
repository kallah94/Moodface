export interface IMoodboard {
  currentday?: String;
  listmood?: Number[];
  listcomment?: String[];
}

export class Moodboard implements IMoodboard {
  constructor(public currentday?: String, public listmood?: Number[], public listcomment?: String[]) {
    this.currentday = currentday ? currentday : null;
    this.listmood = listmood ? listmood : null;
    this.listcomment = listcomment ? listcomment : null;
  }
}
