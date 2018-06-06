import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';
import { AlbumService } from '../album.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  queries: string;



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

  // tslint:disable-next-line:no-shadowed-variable
  filter(query: string) {
      // tslint:disable-next-line:prefer-const
      let filteredProducts = (this.queries) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;
      this.initializeTable(filteredProducts);
  }

  ngOnInit() {
    this.queries = 'spinach';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  receiveMessage($event) {
    this.queries = $event;
    console.log('q', this.queries);
  }

}

