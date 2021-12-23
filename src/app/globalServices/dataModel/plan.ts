export interface Plan {

  id?: number;

  open_at: string;
  close_at: string;

  day__fr: string;
  day__ar: string;
  day__en: string;
  day?: string;

  restaurants_id?: number;
}

export class fakePlan implements Plan {

  id = 1;
  open_at = 'HH:MM';
  close_at = 'HH:MM';
  day__fr = 'dimanche';
  day__ar = 'الاحد';
  day__en = 'sunday';
  day = 'sunday';
  restaurants_id = 1;

  get(number: number) {
    const arr = [];
    for (let i = 0; i < number; i++) {

      arr.push({ ...this, id: i });

    }
    return arr;
  }

  empty() {
    this.id = null;
    this.open_at = '';
    this.close_at = '';
    this.day__fr = '';
    this.day__ar = '';
    this.day__en = '';
    this.day = '';
    this.restaurants_id = null;

    return this;
  }
}
