import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;

    constructor(cartItem: CartItem){
        this.imageUrl = cartItem.product.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.product.unitPrice;
        this.productId = cartItem.product.id;
    }

}
