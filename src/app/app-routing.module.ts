import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopItemDescrComponent } from './shop-item-descr/shop-item-descr.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemHistoryComponent } from './order-item-history/order-item-history.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'home', component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'item/:id', component: ShopItemDescrComponent },
      { path: 'cart', component: CheckoutComponent },
      { path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'order/:id', component: OrderItemHistoryComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
