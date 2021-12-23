

export interface Image {

  id?: number;

  link: string;

  created_at?: string;
  updated_at?: string;

  resource_id?: number;
}

export class fakeImage implements Image {
  id = 1;
  link = '/assets/backgrounds/bg.jpg';
  resource_id = 1;

  get(number: number) {
    const arr = [];
    for (let i = 0; i < number; i++) {

      arr.push({ ...this, id: i });

    }
    return arr;
  }

  empty() {

    this.id = null;
    this.link = '/assets/backgrounds/bg.jpg';
    this.resource_id = null;


    return this;
  }
}
