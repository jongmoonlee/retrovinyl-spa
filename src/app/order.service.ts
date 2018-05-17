import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { User } from 'firebase/app';
import { Item } from './models/item';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    // tslint:disable-next-line:prefer-const
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  getUserId() {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
      }
    });
  }

  getOrderId(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  getOrderById(id: string, number: number) {
    return this.db.list('/orders/' + id + '/items/');
  }

  getShippingById(id: string, number: number) {
    return this.db.object('/orders/' + id + '/shipping/');
  }

  update(orderId, order) {
    return this.db.object('/orders/' + orderId + '/shipping/').update(order);
  }

  delte(orderId) {
    return this.db.object('/orders/' + orderId).remove();
  }

  getUserName(key: string) {
    return this.db.object('/users/' + key, { preserveSnapshot: true });
  }

}
