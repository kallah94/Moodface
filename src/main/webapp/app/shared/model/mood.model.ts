import { Moment } from 'moment';
import { Moods } from 'app/shared/model/enumerations/moods.model';

export interface IMood {
  id?: number;
  mood?: Moods;
  comment?: string;
  date?: Moment;
  anonymous?: boolean;
  userLogin?: string;
  userId?: number;
}

export class Mood implements IMood {
  constructor(
    public id?: number,
    public mood?: Moods,
    public comment?: string,
    public date?: Moment,
    public anonymous?: boolean,
    public userLogin?: string,
    public userId?: number
  ) {
    this.anonymous = this.anonymous || false;
  }
}
