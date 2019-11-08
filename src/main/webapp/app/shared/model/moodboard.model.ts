import { MomentLongDateFormat } from 'moment';

export interface IMoodboard {
  currentday?: String;
  date?: MomentLongDateFormat;
  name?: String;
  listmood?: Number[];
  listcomment?: String[];
  health?: Number;
}

export class Moodboard implements IMoodboard {
  constructor(
    public currentday?: String,
    public date?: MomentLongDateFormat,
    public name?: String,
    public listmood?: Number[],
    public listcomment?: String[],
    public health?: Number
  ) {
    this.currentday = currentday ? currentday : null;
    this.date = date ? date : null;
    this.name = name ? name : null;
    this.listmood = listmood ? listmood : null;
    this.listcomment = listcomment ? listcomment : null;
    this.health = health ? health : null;
  }
}
