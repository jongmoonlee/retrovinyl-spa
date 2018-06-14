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
  model: any = {};

// @Input('queries') queries: string;
// @Output()querieString = new EventEmitter();

  // tslint:disable-next-line:one-line
  constructor(public authService: AuthService){ }

  async ngOnInit() {
    // this.cart$ = await this.shoppingCartService.getCart();
    // this.wish$ = await this.wishListService.getWishList();
    // this.isAdmin = await this.user.isAdmin(this.auth.currentUserId);
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('logged in successfully');
    }, error => {
      console.log('failed to login');
    });
  }


  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }


  onKeyUp() {
    //  console.log('quer', this.queries);
    //  this.querieString.emit(this.queries);
  }

}
