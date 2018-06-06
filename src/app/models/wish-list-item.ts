import { Product } from './product';

export class WishListItem {
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

    constructor(init?: Partial<WishListItem>) {
        Object.assign(this, init);
    }

    get getQuantity() {return this.quantity; }

}
