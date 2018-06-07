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
  styleUrls: ['./product-detail.component.scss']
})



export class ProductDetailComponent implements OnInit {
  // @Input('item') item: Product;
  // tslint:disable-next-line:no-input-rename
  // @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
//  private shoppingCart: ShoppingCart;

  id;
  // product$;
  // cart$;
  album: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private cartService: ShoppingCartService,
    private albumService: AlbumService
  ) {}

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id');
    await this.albumService.get(this.id).subscribe(res => {
      this.album = res.json();
    });
    // this.cart$ = await this.cartService.getCart();
  }
  addToCart() {
    // this.cartService.addToCart(this.product);
  }

}
