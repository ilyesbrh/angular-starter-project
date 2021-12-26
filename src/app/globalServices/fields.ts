export class Fields {

  public static readonly USERS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'email', class: (v) => '', searchIn: false },
    { value: 'username', class: (v) => '', searchIn: true },
    { value: 'phone', class: (v) => '', searchIn: false },
    { value: 'address', class: (v) => '', searchIn: false },
    { value: 'status', class: (v) => v ? 'waiting active' : 'waiting ', searchIn: false }
  ];

}
