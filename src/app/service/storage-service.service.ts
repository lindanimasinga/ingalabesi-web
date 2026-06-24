import { Injectable } from '@angular/core';
import { BasketItem, Basket, Order, UserProfile, StoreProfile } from '../model/models';
import { CurrentLocation } from '../model/current-location';
import { ShoppingList } from '../model/shopping-list';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  USER_PROFILE_KEY = "sdfwefdsfsd";
  BASKET_KEY = "sdfsdfljsdf";
  CURRENT_STORE_ID_KEY = "currentStoreId";
  ORDER_KEY = "fuiwerfbsk";
  PHONE_NUMBER_KEY = "knsdevwruweildkf";
  PHONE_VERIFIED_KEY = "lkjhsdbvskd";
  TOKEN_KEY = "vm1xcnvfoiwerw";
  CUURENT_LOCATION_KEY = "kfjhdyrbvsl";
  SHOPPINGLIST_KEY = "knsdev34w4ei5ldkf";
  jwt: string;
  shop: StoreProfile;
  orders: Array<Order>;
  cache: Storage = window.localStorage
  _phoneNumber: string;
  _phoneVerified: boolean;
  _fcmToken: string;
  _currentLocation: CurrentLocation;
  _shoppingList: ShoppingList;
  _order: Order;
  _basket: Basket;
  _userProfile: UserProfile;
  errorMessage: String;

  _currentStoreId: string;

  constructor() { }

  get currentStoreId(): string {
    if (this._currentStoreId == null) {
      this._currentStoreId = this.cache.getItem(this.CURRENT_STORE_ID_KEY);
    }
    return this._currentStoreId;
  }

  set currentStoreId(storeId: string) {
    this._currentStoreId = storeId;
    this.cache.setItem(this.CURRENT_STORE_ID_KEY, storeId);
  }

  get userProfile() {
    if(this._userProfile == null) {
      this._userProfile = JSON.parse(this.cache.getItem(this.USER_PROFILE_KEY))
    }
    return this._userProfile;
  }

  set userProfile(userProfile: UserProfile) {
    this._userProfile = userProfile
    this.cache.setItem(this.USER_PROFILE_KEY, JSON.stringify(this._userProfile))
  }

  get basket() {
    if(this._basket == null) {
      this._basket = JSON.parse(this.cache.getItem(this.BASKET_KEY))
    }
    return this._basket;
  }

  set basket(basket: Basket) {
    this._basket = basket
    this.cache.setItem(this.BASKET_KEY, JSON.stringify(this._basket))
  }

  set order(order: Order) {
    this._order = order
    this.cache.setItem(this.ORDER_KEY, JSON.stringify(this._order))
  }

  get order() {
    if(this._order == null) {
      this._order = JSON.parse(this.cache.getItem(this.ORDER_KEY))
    }
    return this._order;
  }
  
  get phoneNumber(): string {
    if (this._phoneNumber == null) {
      this._phoneNumber = this.cache.getItem(this.PHONE_NUMBER_KEY);
    }
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
    this.cache.setItem(this.PHONE_NUMBER_KEY, phoneNumber);
  }

  get phoneVerified(): boolean {
    if (this._phoneVerified == null) {
      this._phoneVerified = JSON.parse(this.cache.getItem(this.PHONE_VERIFIED_KEY));
    }
    return this._phoneVerified;
  }

  set phoneVerified(phoneVerified: boolean) {
    this._phoneVerified = phoneVerified;
    this.cache.setItem(this.PHONE_VERIFIED_KEY, JSON.stringify(phoneVerified));
  }

  get fcmToken(): string {
    if (this._fcmToken == null) {
      this._fcmToken = this.cache.getItem(this.TOKEN_KEY);
    }
    return this._fcmToken;
  }

  set fcmToken(token: string) {
    this._fcmToken = token;
    if (token == null) {
      this.cache.removeItem(this.TOKEN_KEY);
    } else {
      this.cache.setItem(this.TOKEN_KEY, token);
    }
  }

  get currentLocation(): CurrentLocation {
    if (this._currentLocation == null) {
      this._currentLocation = JSON.parse(this.cache.getItem(this.CUURENT_LOCATION_KEY));
    }
    return this._currentLocation;
  }

  set currentLocation(currentLocation: CurrentLocation) {
    this._currentLocation = currentLocation;
    if (currentLocation == null) {
      this.cache.removeItem(this.CUURENT_LOCATION_KEY);
    } else {
      this.cache.setItem(this.CUURENT_LOCATION_KEY, JSON.stringify(currentLocation));
    }
  }

  get shoppingList(): ShoppingList {
    if (this._shoppingList == null) {
      this._shoppingList = JSON.parse(this.cache.getItem(this.SHOPPINGLIST_KEY));
    }
    return this._shoppingList;
  }

  set shoppingList(shoppingList: ShoppingList) {
    this._shoppingList = shoppingList;
    if (shoppingList == null) {
      this.cache.removeItem(this.SHOPPINGLIST_KEY);
    } else {
      this.cache.setItem(this.SHOPPINGLIST_KEY, JSON.stringify(shoppingList));
    }
  }

  clearShoppingList(): void {
    this.shoppingList = null;
  }

  addToCart(basketItem: BasketItem) {
    if(this.basket == null) {
      this.basket = {
        items: []
      }
    }
    this.basket.items.push(basketItem)
    this.basket = this.basket
  }

  removeFromCart(name: String) {
    var index = this.basket.items.findIndex(item => item.name == name)
    if (index > -1) {
      this.basket.items.splice(index, 1);
   }
   this.basket = this.basket
  }

  clearOrder() {
    this.basket.items = []
    this.basket = this.basket
  }

  clearCart(): void {
    this._basket = null;
    this.cache.removeItem(this.BASKET_KEY);
  }

  logout(): void {
    this._phoneNumber = null;
    this._phoneVerified = null;
    this._fcmToken = null;
    this._currentLocation = null;
    this._shoppingList = null;
    this._basket = null;
    this._userProfile = null;
    this.shop = null;
    this._order = null;
    this.cache.removeItem(this.PHONE_NUMBER_KEY);
    this.cache.removeItem(this.PHONE_VERIFIED_KEY);
    this.cache.removeItem(this.TOKEN_KEY);
    this.cache.removeItem(this.CUURENT_LOCATION_KEY);
    this.cache.removeItem(this.SHOPPINGLIST_KEY);
    this.cache.removeItem(this.BASKET_KEY);
    this.cache.removeItem(this.USER_PROFILE_KEY);
    this.cache.removeItem(this.ORDER_KEY);
  }

}
