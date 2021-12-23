export interface User {
  id?: number;
  username: string;
  email: string;
  phone: string;
  password?: string;
  address__ar?: string;
  address__fr?: string;
  address__en?: string;
  address?: string;
  link_photo: string | File;
  role: string;
  verified: boolean;
  status: boolean;
  restaurants_id?: number;
}

export class fakeUser implements User {
  id = 1;
  username = 'ilies bourouh';
  email = 'brhilyes@gmail.com';
  phone = '0550595660';
  password = '12345678';
  address__ar = 'bba,bojr obu arretjid , alger , algeria 1123';
  address__en = 'bba,bojr obu arretjid , alger , algeria 1123';
  address__fr = 'bba,bojr obu arretjid , alger , algeria 1123';

  address = 'bba,bojr obu arretjid , alger , algeria 1123';

  link_photo = '/assets/svg/Users.svg';

  role = 'admin';

  verified = true;
  status = true;

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
    this.username = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.address__ar = '';
    this.address__en = '';
    this.address__fr = '';

    this.address = '';

    this.link_photo = '';

    this.role = '';

    this.verified = false;
    this.status = false;

    this.restaurants_id = null;

    return this;
  }

}

