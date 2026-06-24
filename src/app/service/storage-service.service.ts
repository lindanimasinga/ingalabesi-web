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
  _order: Order // = {"basket":{"items":[{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"},{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"},{"name":"Skirt","price":499,"discountPerc":0,"options":[{"name":"Size","values":["30","32","34","38","40"],"selected":"30","price":0},{"name":"Colours","values":["White","Blue","Black","Yellow"],"selected":"White","price":0}],"quantity":1,"image":"https://izinga-aut.s3.af-south-1.amazonaws.com/cs-lifestlye/original.jpg"}]},"customerId":"ffd4c856-644f-4453-a5ed-84689801a747","shopId":"d4bf58f4-44eb-4402-8ee9-b457c263833e","orderType":"ONLINE","stage":"STAGE_0_CUSTOMER_NOT_PAID","description":"CS order 0812815707","shippingData":{"fromAddress":"45 CS lifestyle street","toAddress":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","messengerId":"ffd4c856-644f-4453-a5ed-84689801a747","buildingType":"HOUSE","type":"DELIVERY","additionalInstructions":"call me at 10111"}};
  _basket: Basket
  _userProfile: UserProfile //= {"id":"ffd4c856-644f-4453-a5ed-84689801a747","name":"Lindani","description":"customer","yearsInService":0,"address":"41 Sheffield Cl, Milnerton Rural, Cape Town, 7441, South Africa","imageUrl":"https://pbs.twimg.com/media/C1OKE9QXgAAArDp.jpg","likes":0,"servicesCompleted":0,"badges":0,"mobileNumber":"0812815707","emailAddress":null,"role":"STORE_ADMIN","responseTimeMinutes":0,"verificationCode":null,"bank":{"name":"Ukheshe","phone":"0812815707","accountId":null,"type":"wallet"},"latitude":0.0,"longitude":0.0,"idNumber":""};
  errorMessage: String;

  constructor() { }

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
      this._basket = JSON.parse(this.cache.getItem(this.BASKET_KEY + this.shop?.shortName))
    }
    return this._basket;
  }

  set basket(basket: Basket) {
    this._basket = basket
    this.cache.setItem(this.BASKET_KEY + this.shop?.shortName, JSON.stringify(this._basket))
  }

  set order(order: Order) {
    this._order = order
    this.cache.setItem(this.ORDER_KEY + this.shop?.shortName, JSON.stringify(this._order))
  }

  get order() {
    if(this._order == null) {
      this._order = JSON.parse(this.cache.getItem(this.ORDER_KEY + this.shop?.shortName))
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

}
