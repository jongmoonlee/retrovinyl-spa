import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { AppUser } from '../models/app-user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent  {
  item$;
  orders$;
  appUser: AppUser;
  userId$;
  userName$;
  id;
  orderId$;
  allOrders$;
  idd;
  takenItem$;


  order = {
    'name': null,
    'address': null,
    'address1': null,
    'suburb': null,
    'state': null
    };


  shipping$;

constructor(
  public router: Router,
  public authService: AuthService,
  private orderService: OrderService,
  private userService: UserService,
  private route: ActivatedRoute
) {
  this.id = orderService.getUserId();
  // this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  this.userId$ = this.authService.appUser$.subscribe(appUser => this.appUser = this.appUser);
  this.allOrders$ = orderService.getOrders();
  this.idd = this.route.snapshot.paramMap.get('id');
  this.item$ = orderService.getOrderById(this.idd, 1);
  this.takenItem$ = this.orderService.getOrderById(this.idd, 1);
  this.shipping$ = this.orderService.getShippingById(this.idd, 1);
  this.orderService.getShippingById(this.idd, 1).take(1).subscribe(o => this.order = o);

  }

  save(order) {
    // tslint:disable-next-line:curly
    this.orderService.update(this.idd, order);
    this.router.navigate(['/admin/orders']);
  }

  delete() {
    // tslint:disable-next-line:curly
    if (!confirm('Are you sure you want to delete this procut?')) return;
      this.orderService.delte(this.idd);
      this.router.navigate(['/admin/orders']);
  }
}
