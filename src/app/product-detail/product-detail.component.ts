import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { AlbumService } from '../album.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})



export class ProductDetailComponent implements OnInit {
  @Input('item') item: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
 private shoppingCart: ShoppingCart;

  id;
  product$;
  cart$;

  product = {
    'title': null,
    'price': null,
    'category': null,
    'imageUrl': null,
    'description': null,
    '$key': null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private productService: AlbumService
  ) {


    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.get(this.id).take(1).subscribe(p => this.product = p);

    this.cart$ = this.cartService.getCart();

   }


  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
