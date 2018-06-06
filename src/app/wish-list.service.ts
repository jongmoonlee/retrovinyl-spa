import { async } from '@angular/core/testing';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { WishList } from './models/wish-list';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WishListService {

  constructor(private db: AngularFireDatabase) { }

  async getWishList(): Promise<Observable<WishList>> {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/wish-lists/' + cartId)
    .map(x => new WishList(x.items));
  }




  async addToWishList(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromWishList(product: Product) {
    this.updateItem(product, -1);
  }

  async clearWishList() {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    this.db.object('/wish-lists/' + cartId + '/items').remove();
  }

  private createWishList() {
    return this.db.list('/wish-lists').push({
      dateCreated: new Date().getTime()
    });
  }

  private getWishListItem(cartId: string, productId: number) {
    return this.db.object('/wish-lists/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    // tslint:disable-next-line:prefer-const
    let cartId = localStorage.getItem('cartId');
    // tslint:disable-next-line:curly
    if (cartId) return cartId;
    else {
      // tslint:disable-next-line:prefer-const
      let result = await this.createWishList();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

   private async updateItem(product: Product, change: number) {
     // tslint:disable-next-line:prefer-const
     let cartId = await this.getOrCreateCartId();
     // tslint:disable-next-line:prefer-const
     let item$ = this.getWishListItem(cartId, product.id);
     item$.take(1).subscribe(item => {
       // tslint:disable-next-line:prefer-const
       let quantity = (item.quantity || 0) + change;
       // tslint:disable-next-line:curly
       if (quantity === 0) item$.remove();
       // tslint:disable-next-line:curly
       else
       item$.update({
        name: product.name,
        imgUrl: product.imgUrl,
        price: product.price,
        artist: product.artist,
        year: product.year,
        id: product.id,
        quantity: quantity
        });
     });
  }
}
