import { WishList } from './../models/wish-list';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { EventEmitter } from 'events';
import { JsonPipe } from '@angular/common';
import { UserService } from '../user.service';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-navbar-album',
  templateUrl: './navbar-album.component.html',
  styleUrls: ['./navbar-album.component.scss']
})
export class NavbarAlbumComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  wish$: Observable<WishList>;
  isCollapsed: any;
  idd: string;
  isAdmin;

@Input('queries') queries: string;
@Output()querieString = new EventEmitter();

  constructor(
    public auth: AuthService,
    public user: UserService,
    private shoppingCartService: ShoppingCartService,
    private wishListService: WishListService) {


 }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.wish$ = await this.wishListService.getWishList();
    this.isAdmin = await this.user.isAdmin(this.auth.currentUserId);
  }


  logout() {
    this.auth.logout();
  }
  onKeyUp() {
     console.log('quer', this.queries);
     this.querieString.emit(this.queries);
  }

}
