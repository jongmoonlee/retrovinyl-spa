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
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  orders$;
  userName;

  constructor(
    private orderService: OrderService,
    public authService: AuthService,
    public userService: UserService) {
    this.orders$ = orderService.getOrders();
    }

    getName(id: string) {
      this.orderService.getUserName(id).subscribe
      (snapshot => {
        this.userName = snapshot.val();
        return this.userName;
      });
    }
}
