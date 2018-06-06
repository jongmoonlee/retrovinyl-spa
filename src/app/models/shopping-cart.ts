import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    item: ShoppingCartItem;
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: {[productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {} ;
        // tslint:disable-next-line:curly
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            // tslint:disable-next-line:prefer-const
            let item = itemsMap[productId];

            this.items.push(new ShoppingCartItem({...item, $key: productId }));
        }
    }

    getQuantity(product: ShoppingCartItem) {
        // tslint:disable-next-line:prefer-const
        let item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
      }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:curly
        for (const productId in this.items)
            sum  += this.items[productId].totalPrice;
        return sum;
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
