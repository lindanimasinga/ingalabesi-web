import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreProfile } from '../model/models';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { StorageService } from '../service/storage-service.service';
import {Utils} from '../utils/utils'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private storageService: StorageService,
    private izingaService: IzingaOrderManagementService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.izingaService.getStoreById(environment.storeId)
    .subscribe(
      shop => {
        this.storageService.shop = shop;
        this.storageService.currentStoreId = environment.storeId;
        setTimeout(() => Utils.applyCustomeTheme(shop.brandPrimaryColor), 100);
      },
      error => {
        console.error('Failed to load store', error);
        this.storageService.errorMessage = 'Failed to load store. Please refresh the page.';
      }
    );

    if(this.hasError) {
      this.storageService.errorMessage = null;
    }
  }

  get shop() : StoreProfile {
    return this.storageService.shop
  }

  hasItemsInCart(): boolean {
    return this.storageService.basket != null && this.storageService.basket.items.length > 0;
  }

  shouldShowIcon(): boolean {
    return this.router.url == "/" || this.router.url.startsWith("/item/");
  }

  get cartNumberOfItems() { 
    return this.storageService.basket != null? this.storageService.basket.items?.length : 0;
  }

  get hasError(): boolean {
    return this.storageService.errorMessage != null 
  }

  clearError() {
    this.storageService.errorMessage = null;
  }

  get errorMessage() {
    return this.storageService.errorMessage
  }

}
