import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent {
  items: any;

  constructor(private albumService: AlbumService) {
    this.albumService.getAll().subscribe(res => {
      this.items = res.json();
    });
}
}
