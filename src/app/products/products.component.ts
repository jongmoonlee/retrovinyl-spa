import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import 'rxjs/add/operator/switchMap';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  cart$: Observable<ShoppingCart>;
  items: Product[] = [];
  userId: string;
  album;

  constructor(
    private route: ActivatedRoute,
    private productService: AlbumService
  ) {

   }

  async ngOnInit() {
    this.album = (await this.productService.getAll());
  }




  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
    this.shuffle(this.products);
  }

  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

}
