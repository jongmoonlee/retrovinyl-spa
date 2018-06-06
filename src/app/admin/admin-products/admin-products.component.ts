import { Product } from './../../models/product';
import { AlbumService } from './../../album.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';
// console.assert(DataTableResource, 'Uhoh, Something was not defined, likely part of a circular reference loop');

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor( private productService: AlbumService) {
    this.subscription = this.productService.getAll().
    subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });

  }


  private initializeTable(products: Product[]) {
      this.tableResource = new DataTableResource(products);
      this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
      this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {

    // tslint:disable-next-line:curly
    if (!this.tableResource) return;
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
      // tslint:disable-next-line:prefer-const
      let filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;
    this.initializeTable(filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
