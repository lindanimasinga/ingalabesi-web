import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { Basket } from '../model/basket';
import { BasketItem } from '../model/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {

  }

  get basket(): Basket  {
    return this.storageService.basket;
  }

  remove(item: BasketItem) {
    this.storageService.removeFromCart(item.name)
  }

  loggedId() {
    return this.storageService.userProfile != null && this.storageService.phoneVerified
  }

  totalPrice(): number {
    return this.basket.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  totalItems(): number {
    return this.basket.items.reduce((total, item) => total + item.quantity, 0);
  }

}
