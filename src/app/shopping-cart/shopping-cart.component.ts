import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  wish$;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private wishListService: WishListService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.wish$ = await this.wishListService.getWishList();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  removeWishList(p) {
    this.wishListService.removeFromWishList(p);
  }

}
