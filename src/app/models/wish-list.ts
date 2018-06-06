import { Product } from './product';
import { WishListItem } from './wish-list-item';

export class WishList {
    item: WishListItem;
    items: WishListItem[] = [];

    constructor(private itemsMap: {[productId: string]: WishListItem }) {
        this.itemsMap = itemsMap || {} ;
        // tslint:disable-next-line:curly
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            // tslint:disable-next-line:prefer-const
            let item = itemsMap[productId];

            this.items.push(new WishListItem({...item, $key: productId }));
        }
    }

    getQuantity(product: WishListItem) {
        // tslint:disable-next-line:prefer-const
        let item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
      }

    get totalItemsCount() {
      let count = 0;
      // tslint:disable-next-line:curly
      for (const productId in this.itemsMap)
        count += this.itemsMap[productId].quantity;
    return count;
    }

    get totalItemCount() {
        let count = 0;
        // tslint:disable-next-line:curly
        for (const productId in this.itemsMap)
          count = this.itemsMap[productId].quantity;
      return count;
      }
}
