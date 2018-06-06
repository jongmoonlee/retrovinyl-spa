import { async } from '@angular/core/testing';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart(x.items));
  }

  async getWishList(): Promise<Observable<ShoppingCart>> {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/wish-lists/' + cartId)
    .map(x => new ShoppingCart(x.items));
  }




  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: number) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }



  private async getOrCreateCartId(): Promise<string> {
    // tslint:disable-next-line:prefer-const
    let cartId = localStorage.getItem('cartId');
    // tslint:disable-next-line:curly
    if (cartId) return cartId;
    else {
      // tslint:disable-next-line:prefer-const
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

   private async updateItem(product: Product, change: number) {
     // tslint:disable-next-line:prefer-const
     let cartId = await this.getOrCreateCartId();
     // tslint:disable-next-line:prefer-const
     let item$ = this.getItem(cartId, product.id);
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
