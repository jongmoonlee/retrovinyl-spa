import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, Input } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  isCollapsed: any;
  idd: string;

@Input('queries') queries: string;
@Output()querieString = new EventEmitter();

  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService) {
 }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

  }

  logout() {
    this.auth.logout();
  }
  onKeyUp() {
     console.log('quer', this.queries);
     this.querieString.emit(this.queries);
  }
}
