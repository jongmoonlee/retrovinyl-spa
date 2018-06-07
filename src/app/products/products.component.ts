import { WishList } from './../models/wish-list';
import { WishListService } from './../wish-list.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import 'rxjs/add/operator/switchMap';
import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/take';



@Component({
  selector: 'app-album',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  cart$: Observable<ShoppingCart>;
  wish$: Observable<WishList>;
  userId: string;
  albums: any;
  number: number;
  contentlength;
  a: number;
  isSuffle;

  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  // @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  // @Input('shopping-cart') shoppingCart: ShoppingCart;



  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    // private shoppingCartService: ShoppingCartService,
    // private wishListService: WishListService
    ) {
   }

  async ngOnInit() {
    // this.cart$ = await this.shoppingCartService.getCart();
    // this.wish$ = await this.wishListService.getWishList();
    this.number = 150;
    await this.populateProducts(true);
  }

  public populateProducts(bool) {
    console.log('bool', bool);
    this.albumService.getAll().subscribe(res => {
      this.albums = res.json();
      if (bool === false) {
      return this.isSuffle = false; }
      // tslint:disable-next-line:one-line
      else {
        this.shuffle(this.products);
        return this.isSuffle = true;
      }
    });
 }


  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    }
      readMore(a) {
        console.log('readMore is clicked', a);
        this.number = this.a;

    }
      readLess(a) {
        console.log('readLess is clicked', a);
        this.number = 150;
    }

    // addToCart(album) {
    //   this.shoppingCartService.addToCart(album);
    // }

    // addToWishList(album) {
    //   this.wishListService.addToWishList(album);
    // }

    // removeWishList(album) {
    //   console.log('removeheart is clicekd');
    //   this.wishListService.removeFromWishList(album);
    // }

    Sort() {
      console.log('sort clicked');
    }

}
