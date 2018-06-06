import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent {
  items: Product[] = [];

  constructor(private productService: AlbumService) {
    this.productService
  .getAll()
  .subscribe(products => {
  this.items = products;
  });
}
}
