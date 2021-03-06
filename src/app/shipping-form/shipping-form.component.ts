import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {
    'name': null,
    'address': null,
    'address1': null,
    'state': null,
    'suburb': null,
  };
  suburbs$ = ['Eveleigh', 'Alexandria', 'Waterloo', 'Erskinvile', 'MacDonald Town', 'Redfern'];
  states$ = ['NSW', 'NT', 'QLD', 'VIC', 'TAS', 'ACT', 'ADE'];
  userSubscription: Subscription;
  userId: string;


  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    // this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    // tslint:disable-next-line:prefer-const
    let order = new Order(this.userId, this.shipping, this.cart);
    // tslint:disable-next-line:prefer-const
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
