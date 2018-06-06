import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders$;
  userName$;
  id;

  constructor(
    private authService: AuthService,
    private orderService: OrderService

  ) {
    this.id = orderService.getUserId();
    this.orders$ =
    authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }
}
