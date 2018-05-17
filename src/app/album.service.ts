import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AlbumService {

  constructor(private db: AngularFireDatabase) { }


  getAll() {
    return this.db.list('/albums');
  }

   create(album) {
    return this.db.list('/').push(album);
 }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delte(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
