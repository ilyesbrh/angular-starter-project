export interface Size {
  id?: number;

  type: string;

  size__ar: string;
  size__fr: string;
  size__en: string;
  size?: string;

  created_at?: string;
  updated_at?: string;
}

export class fakeSize implements Size {
  id = 1;
  type = 'large';
  size__ar = 'حجم';
  size__fr = 'taill';
  size__en = 'size';
  size = 'size';

  get(number: number) {
    const arr = [];
    for (let i = 0; i < number; i++) {

      arr.push({ ...this, id: i });

    }
    return arr;
  }
  empty() {
    this.id = null;
    this.type = '';
    this.size__ar = '';
    this.size__fr = '';
    this.size__en = '';
    this.size = '';

    return this;
  }
}
