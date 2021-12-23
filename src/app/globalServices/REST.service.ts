import { Order, orderFactory } from './dataModel/order';
import { Category } from './dataModel/category';
import { ResponseTrimmerService } from './custom-provider/response-trimmer.service';
import { User } from './dataModel/user';
import { Offer } from './dataModel/offer';
import { Plan } from './dataModel/plan';
import { Size } from './dataModel/size';
import { Ingredient } from './dataModel/ingredient';
import { Product } from './dataModel/product';
import { Restaurant, fakeRestaurant, RestaurantConstructor } from './dataModel/restaurant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ROOT = environment.API_URL;
const USERS_ME = () => `${ROOT}users/me`;
const USERS_WORKERS = () => `${ROOT}users/workers`;
const USER_WORKERS = () => `${ROOT}users`;
const USERS_WORKERS_DELIVERY = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/delivery`;
const USER = (id_user) => `${ROOT}users/${id_user}`;

const RESTAURANTS = () => `${ROOT}restaurants`;

const RESTAURANT = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}`;
const RESTAURANT_EQUIVALENT = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/equivalents`;
const RESTAURANT_WIN_RECEIVED = (id_restaurant, id_win) => `${ROOT}restaurants/${id_restaurant}/win/${id_win}/received`;
const RESTAURANT_PRODUCTS = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/products`;
const RESTAURANT_IMAGES = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/images`;

const RESTAURANT_INGREDIENTS = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/ingredients`;
const RESTAURANT_INGREDIENT = (id_restaurant, id_ingredient) => `${ROOT}restaurants/${id_restaurant}/ingredients/${id_ingredient}`;

const RESTAURANT_CATEGORIES = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/categories`;
const RESTAURANT_CATEGORY = (id_restaurant, id_category) => `${ROOT}restaurants/${id_restaurant}/categories/${id_category}`;

const RESTAURANT_PLANS = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/plans`;
const RESTAURANT_PLAN = (id_restaurant, id_plan) => `${ROOT}restaurants/${id_restaurant}/plans/${id_plan}`;

const RESTAURANT_ORDERS = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/orders`;
const RESTAURANT_ORDERS_ARCHIVE = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/orders/archive`;
const RESTAURANT_ORDER = (id_restaurant, id_order) => `${ROOT}restaurants/${id_restaurant}/orders/${id_order}`;

const RESTAURANT_OFFERS = (id_restaurant) => `${ROOT}restaurants/${id_restaurant}/offers`;
const RESTAURANT_OFFER = (id_restaurant, id_offer) => `${ROOT}restaurants/${id_restaurant}/offers/${id_offer}`;

const OFFER_IMAGES = (id_offer) => `${ROOT}offers/${id_offer}/images`;

const OFFER_PRODUCTS = (id_offer) => `${ROOT}offers/${id_offer}/products`;
const OFFER_PRODUCT = (id_offer, id_product) => `${ROOT}offers/${id_offer}/products/${id_product}`;
const OFFER_PRODUCT_SIZE = (id_offer, id_product, size_id) => `${ROOT}offers/${id_offer}/products/${id_product}/sizes/${size_id}`;

const CATEGORY_PRODUCTS = (id_category) => `${ROOT}categories/${id_category}/products`;
const CATEGORY_PRODUCT = (id_product) => `${ROOT}products/${id_product}`;

const PRODUCT_IMAGES = (id_product) => `${ROOT}products/${id_product}/images`;

const PRODUCT_SIZES = (id_product) => `${ROOT}products/${id_product}/sizes`;
const PRODUCT_PRICE = (id_product, id_size) => `${ROOT}products/${id_product}/sizes/${id_size}`;

const PRODUCT_INGREDIENTS = (id_product) => `${ROOT}products/${id_product}/ingredients`;
const PRODUCT_INGREDIENT_SUPPLEMENTS = (id_product) => `${ROOT}products/${id_product}/ingredients_supplements`;
const PRODUCT_INGREDIENT = (id_product, id_ingredient) => `${ROOT}products/${id_product}/ingredients/${id_ingredient}`;
const PRODUCT_INGREDIENT_SUPPLEMENT = (id_product, id_ingredient) => `${ROOT}products/${id_product}/ingredients_supplements/${id_ingredient}`;

const INGREDIENT_SIZES = (id_ingredient) => `${ROOT}ingredients/${id_ingredient}/sizes`;
const INGREDIENT_SIZE = (id_ingredient, id_size) => `${ROOT}ingredients/${id_ingredient}/sizes/${id_size}`;

const SIZES = () => `${ROOT}sizes`;
const ORDERS = () => `${ROOT}orders`;
const SIZE = (id_size) => `${ROOT}sizes/${id_size}`;

const IMAGE = (id_image, type) => `${ROOT}images/${id_image}/${type}`;

const NOTIFICATION_LINK = `${ROOT}notifications`;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private trimmer: ResponseTrimmerService) {
  }

  mapper = (val) => {

    val.forEach(e => {
      let keys = Object.keys(e);
      let vals = Object.values(e);

      for (let i = 0; i < keys.length; i++) {
        e[keys[i].split('__')[0]] = vals[i];
      }

    });
    return val;
  }

  /* AUTHENTICATION */
  login = (email, password) => this.http.post(ROOT + 'login', { email, password });
  logout = () => this.http.get(ROOT + 'logout');
  notification = (data) => this.http.post(ROOT + 'notification', { fcm_id: data });
  register = (user) => this.http.post(ROOT + 'register', user);

  /* users/me */
  me_GET = () => this.http.get<any>(USERS_ME()).pipe(map(item => this.trimmer.user(item.user))).toPromise();

  /* users/workers */
  Workers_CREATE = (data) => this.http.post(USERS_WORKERS(), data).toPromise();
  Workers_GET = () => this.http.get<{ vendors: Array<User>, delivery_workers: Array<User> }>(USER_WORKERS())
    .pipe(
      map(
        items => {
          items.delivery_workers = items.delivery_workers.map(item => this.trimmer.user(item));
          items.vendors = items.vendors.map(item => this.trimmer.user(item));

          return items;
        }
      )
    )
    .toPromise();

  /* users/workers/delivery_man */
  WorkersDeliveryman_GET = (id_restaurant) => this.http.get<Array<User>>(USERS_WORKERS_DELIVERY(id_restaurant)).pipe(map(items => items.map(item => this.trimmer.user(item)))).toPromise();;

  /* users/workers/{id_user} */
  OneWorker_GET = (id_user) => this.http.get<User>(USER(id_user)).pipe(map(item => this.trimmer.user(item))).toPromise();
  OneWorker_DELETE = (id_user) => this.http.delete(USER(id_user)).toPromise();
  OneWorker_UPDATE = (id_user, data) => this.http.put(USER(id_user), data).toPromise();

  /* restaurants */
  restaurants_GET = (sizes) => this.http.get<Array<Restaurant>>(RESTAURANTS()).pipe(map(items => items.map(item => {

    item = RestaurantConstructor(item, sizes);

    item = this.trimmer.restaurant(item);

    return item;

  }
  ))).toPromise();
  restaurants_CREATE = (data) => this.http.post(RESTAURANTS(), data).pipe(map((r: any) => r.restaurants)).toPromise();

  /* restaurants/{id_restaurant} */
  Restaurant_GET = (id_restaurant, sizes) => this.http.get<Restaurant>(RESTAURANT(id_restaurant)).pipe(map(item => {

    item = RestaurantConstructor(item[0], sizes);

    return this.trimmer.restaurant(item)
  })).toPromise();
  Restaurant_DELETE = (id_restaurant) => this.http.delete(RESTAURANT(id_restaurant)).toPromise();
  Restaurant_UPDATE = (id_restaurant, data) => this.http.put(RESTAURANT(id_restaurant), data).toPromise();

  /* restaurants/{id_restaurant}/products */
  RestaurantProducts_GET = (id_restaurant) => this.http.get<Array<Product>>(RESTAURANT_PRODUCTS(id_restaurant)).pipe(map(items => items.map(item => this.trimmer.product(item)))).toPromise();

  /* restaurants/{id_restaurant}/equivalent */
  RestaurantEquivalent_CREATE = (id_restaurant, data) => this.http.post(RESTAURANT_EQUIVALENT(id_restaurant), data).toPromise();
  /* restaurants/{id_restaurant}/win/{id_win}/received */
  RestaurantWin_UPDATE = (id_restaurant, id_win) => this.http.post(RESTAURANT_WIN_RECEIVED(id_restaurant, id_win), {}).toPromise();

  /* restaurants/{id_restaurant}/ingredients */
  RestaurantIngredients_GET = (id_restaurant) => this.http.get<Array<Ingredient>>(RESTAURANT_INGREDIENTS(id_restaurant)).pipe(map(items => items.map(item => this.trimmer.ingredient(item)))).toPromise();
  RestaurantIngredients_CREATE = (id_restaurant, data) => this.http.post<Ingredient>(RESTAURANT_INGREDIENTS(id_restaurant), data).toPromise();
  /* restaurants/{id_restaurant}/ingredients/{id_ingredient} */
  RestaurantIngredient_GET = (id_restaurant, id_ingredient) => this.http.get<Ingredient>(RESTAURANT_INGREDIENT(id_restaurant, id_ingredient)).pipe(map(item => this.trimmer.ingredient(item))).toPromise();
  RestaurantIngredient_UPDATE = (id_restaurant, id_ingredient, data) => this.http.put<Ingredient>(RESTAURANT_INGREDIENT(id_restaurant, id_ingredient), data).toPromise();
  RestaurantIngredient_DELETE = (id_restaurant, id_ingredient) => this.http.delete(RESTAURANT_INGREDIENT(id_restaurant, id_ingredient)).toPromise();

  /* restaurants/{id}/images */
  RestaurantImages_GET = (id_restaurant) => this.http.get(RESTAURANT_IMAGES(id_restaurant)).toPromise();
  RestaurantImages_CREATE = (id_restaurant, data) => this.http.post(RESTAURANT_IMAGES(id_restaurant), data).toPromise();

  /* restaurants/{id}/categories */
  RestaurantCategories_GET = (id_restaurant) => this.http.get<Array<Category>>(RESTAURANT_CATEGORIES(id_restaurant)).pipe(map(items => items.map(item => this.trimmer.category(item)))).toPromise();
  RestaurantCategories_CREATE = (id_restaurant, data) => this.http.post(RESTAURANT_CATEGORIES(id_restaurant), data).toPromise();

  /* restaurants/{id_restaurant}/categories/{id_category} */
  RestaurantCategory_GET = (id_restaurant, id_category) => this.http.get<Category>(RESTAURANT_CATEGORY(id_restaurant, id_category)).pipe(map(item => this.trimmer.category(item[0]))).toPromise();
  RestaurantCategory_DELETE = (id_restaurant, id_category) => this.http.delete(RESTAURANT_CATEGORY(id_restaurant, id_category)).toPromise();
  RestaurantCategory_UPDATE = (id_restaurant, id_category, data) => this.http.put(RESTAURANT_CATEGORY(id_restaurant, id_category), data).toPromise();

  /* restaurants/{id}/plans */
  RestaurantPlans_GET = (id_restaurant) => this.http.get<Array<Plan>>(RESTAURANT_PLANS(id_restaurant)).pipe(map(items => items.map(item => this.trimmer.plan(item)))).toPromise();
  RestaurantPlans_CREATE = (id_restaurant, data) => this.http.post(RESTAURANT_PLANS(id_restaurant), data).toPromise();

  /* restaurants/{id_restaurant}/plans/{id_plan} */
  RestaurantPlan_GET = (id_restaurant, id_plan) => this.http.get<Plan>(RESTAURANT_PLAN(id_restaurant, id_plan)).pipe(map(item => this.trimmer.plan(item))).toPromise();
  RestaurantPlan_DELETE = (id_restaurant, id_plan) => this.http.delete(RESTAURANT_PLAN(id_restaurant, id_plan)).toPromise();
  RestaurantPlan_UPDATE = (id_restaurant, id_plan, data) => this.http.put(RESTAURANT_PLAN(id_restaurant, id_plan), data).toPromise();

  /* restaurants/{id}/offers */
  RestaurantOffers_GET = (id_restaurant) => this.http.get<Array<Offer>>(RESTAURANT_OFFERS(id_restaurant)).pipe(map(items => items.map(item => this.trimmer.offer(item)))).toPromise();
  RestaurantOffers_CREATE = (id_restaurant, data) => this.http.post(RESTAURANT_OFFERS(id_restaurant), data).toPromise();

  /* restaurants/{id_restaurant}/offers/{id_offer} */
  RestaurantOffer_GET = (id_restaurant, id_offer) => this.http.get<any>(RESTAURANT_OFFER(id_restaurant, id_offer)).pipe(map(item => {
    item.images = item.graphic_offers;
    delete item.graphic_offers;

    item.products.forEach(p => {
      p.quantity = p.pivot.quantity;
      p.sizes_id = p.pivot.sizes_id;
      delete p.pivot;
    });

    return this.trimmer.offer(item);
  })).toPromise();
  RestaurantOffer_DELETE = (id_restaurant, id_offer) => this.http.delete(RESTAURANT_OFFER(id_restaurant, id_offer)).toPromise();
  RestaurantOffer_UPDATE = (id_restaurant, id_offer, data) => this.http.put(RESTAURANT_OFFER(id_restaurant, id_offer), data).toPromise();

  /* Restaurant/{id_restaurant}/orders */
  RestaurantOrders_GET = (id_restaurant, restaurant, sizes) => this.http.get<Array<Order>>(RESTAURANT_ORDERS(id_restaurant)).pipe(map(items => items.map(item => {

    item = orderFactory(item, restaurant, sizes);

    return this.trimmer.order(item);
  }))).toPromise();
  RestaurantOrdersArchive_GET = (id_restaurant, restaurant, sizes) => this.http.get<Array<Order>>(RESTAURANT_ORDERS_ARCHIVE(id_restaurant)).pipe(map(items => items.map(item => {

    item = orderFactory(item, restaurant, sizes);

    return this.trimmer.order(item);
  }))).toPromise();
  RestaurantOrders_CREATE = (data) => this.http.post(ORDERS(), data).toPromise();

  /* Restaurant/{id_restaurant}/orders/{id_order} */
  RestaurantOrder_GET = (id_restaurant, id_order) => this.http.get<Order>(RESTAURANT_ORDER(id_restaurant, id_order)).pipe(map(item => this.trimmer.order(item))).toPromise();
  RestaurantOrder_DELETE = (id_restaurant, id_order) => this.http.delete(RESTAURANT_ORDER(id_restaurant, id_order)).toPromise();
  RestaurantOrder_UPDATE = (id_restaurant, id_order, data) => this.http.put(RESTAURANT_ORDER(id_restaurant, id_order), data).toPromise();

  /* offers/{id_offer}/images */
  OfferImages_GET = (id_offer) => this.http.get(OFFER_IMAGES(id_offer)).toPromise();
  OfferImages_CREATE = (id_offer, data) => this.http.post(OFFER_IMAGES(id_offer), data).toPromise();

  /* offers/{id_offer}/product/{id_product} */
  OfferProducts_CREATE = (id_offer, data) => this.http.post(OFFER_PRODUCTS(id_offer), data).toPromise();
  OfferProducts_DELETE = (id_offer, id_product, size_id) => this.http.delete(OFFER_PRODUCT_SIZE(id_offer, id_product, size_id)).toPromise();

  /* categories/{id_category}/products */
  CategoryProducts_GET = (id_category) => this.http.get<Array<Product>>(CATEGORY_PRODUCTS(id_category)).pipe(map(items => items.map(item => this.trimmer.product(item)))).toPromise();
  CategoryProducts_CREATE = (id_category, data) => this.http.post(CATEGORY_PRODUCTS(id_category), data).toPromise();

  /* categories/{id_category}/products/{id_product} */
  CategoryProduct_GET = (id_category, id_product) => this.http.get<Product>(CATEGORY_PRODUCT(id_product)).pipe(map((item: any) => {
    item.prices = item.sizes;
    item.prices = item.prices.map(v => this.trimmer.size(v));
    delete item.sizes;

    item.ingredients_supplements = item.ingredients_supplements.map(item => this.trimmer.ingredient(item));

    item.images = item.graphics_products;
    delete item.graphics_products;
    item.has_supplement = item.has_supplement == 1;
    return this.trimmer.product(item)
  })).toPromise();
  CategoryProduct_DELETE = (id_category, id_product) => this.http.delete(CATEGORY_PRODUCT(id_product)).toPromise();
  CategoryProduct_UPDATE = (id_category, id_product, data) => this.http.put(CATEGORY_PRODUCT(id_product), data).toPromise();

  /* products/{id_product}/images */
  ProductImages_GET = (id_product) => this.http.get(PRODUCT_IMAGES(id_product)).toPromise();
  ProductImages_CREATE = (id_product, data) => this.http.post(PRODUCT_IMAGES(id_product), data).toPromise();

  /* products/{id_product}/sizes */
  ProductSizes_GET = (id_product) => this.http.get<Array<Size>>(PRODUCT_SIZES(id_product)).pipe(map(items => items.map(item => this.trimmer.size(item)))).toPromise();

  /* products/{id_product}/sizes/{id_size} */
  ProductSize_GET = (id_product, id_size) => this.http.get<{ size: Size, price: number }>(PRODUCT_PRICE(id_product, id_size))
    .pipe(map(item => {
      return {
        size: this.trimmer.size(item.size),
        price: item.price
      }
    })).toPromise();
  ProductSize_DELETE = (id_product, id_size) => this.http.delete(PRODUCT_PRICE(id_product, id_size)).toPromise();
  ProductSize_UPDATE = (id_product, id_size, data) => this.http.put(PRODUCT_PRICE(id_product, id_size), data).toPromise();
  ProductSize_CREATE = (id_product, id_size, data) => this.http.post(PRODUCT_PRICE(id_product, id_size), data).toPromise();

  /* products/{id_product}/ingredients */
  ProductIngredients_GET = (id_product) => this.http.get<Array<Ingredient>>(PRODUCT_INGREDIENTS(id_product)).pipe(map(items => items.map(item => this.trimmer.ingredient(item)))).toPromise();
  ProductIngredients_CREATE = (id_product, data) => this.http.post(PRODUCT_INGREDIENTS(id_product), data).toPromise();
  /* products/{id_product}/ingredients_supplements */
  ProductIngredientsSupplements_GET = (id_product) => this.http.get<Array<Ingredient>>(PRODUCT_INGREDIENT_SUPPLEMENTS(id_product)).pipe(map(items => items.map(item => this.trimmer.ingredient(item)))).toPromise();
  ProductIngredientsSupplements_CREATE = (id_product, data) => this.http.post(PRODUCT_INGREDIENT_SUPPLEMENTS(id_product), data).toPromise();

  /* products/{id_product}/ingredients/{id_ingredient} */
  ProductIngredient_GET = (id_product, id_ingredient) => this.http.get<Ingredient>(PRODUCT_INGREDIENT(id_product, id_ingredient)).pipe(map(item => this.trimmer.ingredient(item))).toPromise();
  ProductIngredient_DELETE = (id_product, id_ingredient) => this.http.delete(PRODUCT_INGREDIENT(id_product, id_ingredient)).toPromise();
  ProductIngredient_UPDATE = (id_product, id_ingredient, data) => this.http.put(PRODUCT_INGREDIENT(id_product, id_ingredient), data).toPromise();

  /* products/{id_product}/ingredients_supplements/{id_ingredient} */
  ProductIngredientSupplement_GET = (id_product, id_ingredient) => this.http.get<Ingredient>(PRODUCT_INGREDIENT_SUPPLEMENT(id_product, id_ingredient)).pipe(map(item => this.trimmer.ingredient(item))).toPromise();
  ProductIngredientSupplement_DELETE = (id_product, id_ingredient) => this.http.delete(PRODUCT_INGREDIENT_SUPPLEMENT(id_product, id_ingredient)).toPromise();
  ProductIngredientSupplement_UPDATE = (id_product, id_ingredient, data) => this.http.put(PRODUCT_INGREDIENT_SUPPLEMENT(id_product, id_ingredient), data).toPromise();

  /* ingredients/{id_ingredient}/sizes */
  IngredientSizes_GET = (id_ingredient) => this.http.get<Array<Size>>(INGREDIENT_SIZES(id_ingredient)).pipe(map(items => items.map(item => this.trimmer.size(item)))).toPromise();

  /* ingredients/{id_ingredient}/sizes/{id_size} */
  IngredientSize_GET = (id_ingredient, id_size) => this.http.get<{ size: Size, price: number }>(INGREDIENT_SIZE(id_ingredient, id_size)).pipe(map(item => {
    return {
      size: this.trimmer.size(item.size),
      price: item.price
    }
  })).toPromise();
  IngredientSize_DELETE = (id_ingredient, id_size) => this.http.delete(INGREDIENT_SIZE(id_ingredient, id_size)).toPromise();
  IngredientSize_UPDATE = (id_ingredient, id_size, data) => this.http.put(INGREDIENT_SIZE(id_ingredient, id_size), data).toPromise();
  IngredientSize_CREATE = (id_ingredient, id_size, data) => this.http.post(INGREDIENT_SIZE(id_ingredient, id_size), data).toPromise();

  /* images/{id_image} */
  Image_DELETE = (id_image, type) => this.http.delete(IMAGE(id_image, type)).toPromise();
  Image_UPDATE = (id_image, type, data) => this.http.put(IMAGE(id_image, type), data).toPromise();
  Image_GET = (link) => this.http.get(link, { responseType: 'blob' }).toPromise();

  /* sizes */
  Sizes_GET = () => this.http.get<Array<Size>>(SIZES()).pipe(map(items => items.map(item => this.trimmer.size(item)))).toPromise();
  Sizes_CREATE = (data) => this.http.post(SIZES(), data).toPromise();

  /* sizes/{id_size} */
  Size_GET = (id_size) => this.http.get<Size>(SIZE(id_size)).pipe(map(item => this.trimmer.size(item))).toPromise();
  Size_DELETE = (id_size) => this.http.delete(SIZE(id_size)).toPromise();
  Size_UPDATE = (id_size, data) => this.http.put(SIZE(id_size), data).toPromise();

  ORDER_ACCEPT = (id) => this.http.put(`${ROOT}orders/${id}/accept`, {}).toPromise();
  ORDER_DECLINE = (id) => this.http.put(`${ROOT}orders/${id}/decline`, {}).toPromise();
  ORDER_DELIVER = (id_order, id_delivery) => this.http.put(`${ROOT}orders/${id_order}/deliver/${id_delivery}`, {}).toPromise();
  ORDER_DELIVERED = (id_order) => this.http.put(`${ROOT}orders/${id_order}/delivered`, {}).toPromise();

  getNotifications = () => this.http.get(NOTIFICATION_LINK).toPromise();

  download(url): Observable<any> {
    return this.http.get(ROOT + 'files/' + url, {
      headers: {
        accept: 'application/octet-stream',
        'content-type': 'application/octet-stream',
      },
      responseType: 'blob'
    });
  }

}

