import { Product } from './product';

export class ShoppingCartItem {
    title: string;
    price: number;
    artist: string;
    imgUrl: string;
    $key: string;
    content: string;
    rank: number;
    name: string;
    year: number;
    quantity: number;
    id?: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {return this.price * this.quantity; }

    get getQuantity() {return this.quantity; }

}
