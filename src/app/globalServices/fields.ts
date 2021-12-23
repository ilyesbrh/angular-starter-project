export class Fields {

  public static readonly RESTAURANT = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'name', class: (v) => '', searchIn: true },
    { value: 'address', class: (v) => '', searchIn: false },
    { value: 'email', class: (v) => '', searchIn: false },
    { value: 'rating', class: (v) => (v > 3) ? 'waiting active' : 'waiting', searchIn: false },
  ];

  public static readonly PRICES = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'size', class: (v) => '', searchIn: true },
    { value: 'price', class: (v) => '', searchIn: false }
  ];
  public static readonly PLANS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'open_at', class: (v) => '', searchIn: false },
    { value: 'close_at', class: (v) => '', searchIn: false },
    { value: 'day', class: (v) => '', searchIn: true }
  ];
  public static readonly OFFER_PRODUCTS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'name', class: (v) => '', searchIn: true },
    { value: 'size_name', class: (v) => '', searchIn: false },
    { value: 'quantity', class: (v) => '', searchIn: false },
  ];

  public static readonly PRODUCTS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'name', class: (v) => '', searchIn: true },
    { value: 'description', class: (v) => '', searchIn: false },
    { value: 'has_supplements', class: (v) => '', searchIn: false },
    { value: 'rating', class: (v) => (v > 3) ? 'waiting active' : 'waiting', searchIn: false },
  ];
  public static readonly USERS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'email', class: (v) => '', searchIn: false },
    { value: 'username', class: (v) => '', searchIn: true },
    { value: 'phone', class: (v) => '', searchIn: false },
    { value: 'address', class: (v) => '', searchIn: false },
    { value: 'status', class: (v) => v ? 'waiting active' : 'waiting ', searchIn: false }
  ];

  public static readonly WIN = [
    { value: 'username', class: (v) => '', searchIn: true },
    { value: 'email', class: (v) => '', searchIn: false },
    { value: 'phone', class: (v) => '', searchIn: false },
    { value: 'received', class: (v) => v == 'Waiting' ? 'waiting ' : 'waiting active', searchIn: false }
  ];

  public static readonly CATEGORIES = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'category', class: (v) => '', searchIn: true },
  ];

  public static readonly OFFERS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'name', class: (v) => '', searchIn: true },
  ];

  public static readonly INGREDIENTS = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'ingredient', class: (v) => '', searchIn: true }
  ];

  public static readonly SIZE = [
    { value: 'id', class: (v) => '', searchIn: false },
    { value: 'size', class: (v) => '', searchIn: true },
    { value: 'type', class: (v) => '', searchIn: false }
  ];

  public static readonly ORDER = [
    { value: 'id', class: (v) => '', searchIn: true },
    { value: 'price', class: (v) => '', searchIn: false },
    { value: 'customer_name', class: (v) => '', searchIn: false },
    { value: 'delivery_name', class: (v) => '', searchIn: false },
    { value: 'confirmation_status', class: (v) => (v > 10) ? 'waiting active' : 'waiting', searchIn: false },
  ];
}
