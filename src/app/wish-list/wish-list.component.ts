import { WishListService } from './../wish-list.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from './../models/product';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  products: Product[] = [];
  wish$;
  cart$: Observable<ShoppingCart>;

  constructor(
    private wishListService: WishListService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.wish$ = await this.wishListService.getWishList();
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearWishList() {
    this.wishListService.clearWishList();
  }

  addToCart(album) {
    this.shoppingCartService.addToCart(album);
  }

  removeWishList(album) {
    console.log('removeheart is clicekd');
    this.wishListService.removeFromWishList(album);
  }
}
