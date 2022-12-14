import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

@Injectable({
    providedIn: 'root'
})
export class CartService {
	
    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new BehaviorSubject<number>(0);
    totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

    constructor() { }




    addToCart(theCartItem: CartItem) {
        // check if we already have the item in the cart
        let alreadyExistitsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0) {
            // find the item in cart based on item id
            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.product.id === theCartItem.product.id);

            // check if found it
            alreadyExistitsInCart = (existingCartItem != undefined);
        }

        // increment the quantity
        if (alreadyExistitsInCart) {
            existingCartItem.quantity++;
        } else {
            // add cartItem to cartItems array
            this.cartItems.push(theCartItem);
        }

        // compute cart total price and quantity
        this.computeCartTotals();
    }

    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.product.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }

        //publish the new values ... all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        //log cart data just for debugging
        this.logCartData(totalPriceValue, totalQuantityValue);
    }

    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        console.log('Contents of the cart');
        for (let tempCartItem of this.cartItems) {
            const subTotalPrice = tempCartItem.quantity * tempCartItem.product.unitPrice;
            console.log(`name: ${tempCartItem.product.name}, qunatity=${tempCartItem.quantity}, unitPrice=${tempCartItem.product.unitPrice}, subTotalPrice=${subTotalPrice}`);
        }
        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
        console.log('----');
    }

    decrementQuantity(theCartItem: CartItem) {
        theCartItem.quantity--;
        if(theCartItem.quantity === 0) {
            this.remove(theCartItem);
        } else {
            this.computeCartTotals();
        }
	}
    remove(theCartItem: CartItem) {
        const itemIndex = this.cartItems.findIndex( 
            tempCartItem => 
                tempCartItem.product.id == theCartItem.product.id);
        if(itemIndex > -1){
            this.cartItems.splice(itemIndex,1);
            this.computeCartTotals();
        }
    }
}
