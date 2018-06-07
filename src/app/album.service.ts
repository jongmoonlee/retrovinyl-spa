import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AlbumService {

  constructor(private http: Http) { }


  getAll() {
    return this.http.get('http://localhost:5000/api/albums');
  }

   create(album) {
    // return this.db.list('/').push(album);
 }

  get(productId) {
    return this.http.get('http://localhost:5000/api/albums/' + productId);
  }

  update(productId, product) {
    // return this.db.object('/albums/' + productId).update(product);
  }

  delte(productId) {
    // return this.db.object('/albums/' + productId).remove();
  }
}
