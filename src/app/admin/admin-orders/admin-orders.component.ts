import { FirebaseObjectObservable } from 'angularfire2/database';
import { UserService } from './../../user.service';
import { Order } from './../../models/order';
import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;
  x;

  constructor(
    private orderService: OrderService,
    public authService: AuthService,
    public userService: UserService) {
    this.orders$ = orderService.getOrders();
    }

    getName(id: string) {
      this.orderService.getUserName(id).subscribe
      (snapshot => {
        this.x = snapshot.val();
        return this.x;
      });
    }
}
