import { Component, OnInit } from '@angular/core';
import { Order } from '../model/models';
import { StorageService } from '../service/storage-service.service';
import { mergeMap, map } from 'rxjs/operators';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  order: Order;
  paymentBusy = false;
  paymentSuccesful = false;
  orderCompleted = false;
  shopName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private izingaService: IzingaOrderManagementService) {
    this.order = this.storageService.order;
  }

  ngOnInit(): void {

    if (this.order != null) {
      this.shopName = this.storageService.shop?.name;
    }

    this.route.queryParams.subscribe(queryParamMap => {
      var transactionId = queryParamMap['TransactionId'];
      var transactionRef: string = queryParamMap['TransactionReference'];
      var status = queryParamMap['Status'];
      var orderId = transactionRef?.replace("ord-", "");
      console.log(`transaction id is ${transactionId}`);
      console.log(`status is ${status}`);
      console.log(`transactionRef is ${transactionRef}`);

      if (!orderId) return;

      this.paymentBusy = true;
      this.izingaService.getOrderById(orderId)
        .pipe(
          mergeMap(order => {
            if (status == "Complete") {
              this.order = order;
              // TODO: wire Yoco popup SDK (issue #9)
              this.order.description = "yoco-" + transactionId;
              this.order.paymentType = "YOCO";
              return this.izingaService.finishOrder(this.order).
                pipe(
                  map(order => {
                    this.storageService.clearOrder();
                    return order;
                  })
                );
            }
            return of(order);
          })
        ).subscribe(order => {
          this.order = order;
          this.storageService.order = order;
          if (order.stage == Order.StageEnum._1WAITINGSTORECONFIRM) {
            this.router.navigate(['../order', order.id], { relativeTo: this.route });
          }

          this.shopName = this.storageService?.shop?.name;
          if (this.shopName == null) {
            this.izingaService.getStoreById(order.shopId)
              .subscribe(shop => this.shopName = shop.name);
          }
        },
          (error) => {
            console.log("error is " + error);
          },
          () => this.paymentBusy = false
        );
    });
  }

  payWithYoco(): void {
    // TODO: wire Yoco popup SDK (issue #9)
    console.log('Yoco payment trigger — not yet implemented');
  }

}
