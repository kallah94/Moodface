export interface IMoodPlatValModel {
  name?: string;
  moodvalue?: Number[];
}

export class MoodPlatValModel implements IMoodPlatValModel {
  constructor(public name?: string, public moodvalue?: Number[]) {
    this.name = name ? name : null;
    this.moodvalue = moodvalue ? moodvalue : null;
  }
  toString() {
    return 'name ' + this.name;
  }
}
