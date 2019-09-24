import { IUser } from 'app/core/user/user.model';

export const enum Moods {
  VERY_HAPPY = 'VERY_HAPPY',
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY'
}

export interface IMood {
  id?: number;
  commentaire?: string;
  mood?: Moods;
  agent?: IUser;
}

export class Mood implements IMood {
  constructor(public id?: number, public commentaire?: string, public mood?: Moods, public agent?: IUser) {}
}
