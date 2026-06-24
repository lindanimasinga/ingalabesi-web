import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopItemDescrComponent } from './shop-item-descr/shop-item-descr.component';
import { HomeComponent } from './home/home.component';
import { IzingaOrderManagementService} from './service/izinga-order-management.service'
import {FirebaseService} from './service/firebase.service'
import { StorageService} from './service/storage-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { OrderItemHistoryComponent } from './order-item-history/order-item-history.component';
import { PlaceAutocompleteComponent } from './place-autocomplete/place-autocomplete.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopItemComponent,
    ShopItemDescrComponent,
    HomeComponent,
    CheckoutComponent,
    ShippingComponent,
    PaymentComponent,
    OrdersComponent,
    OtherItemsComponent,
    OrderItemHistoryComponent,
    PlaceAutocompleteComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    NgxQRCodeModule
  ],
  providers: [
    IzingaOrderManagementService,
    StorageService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
