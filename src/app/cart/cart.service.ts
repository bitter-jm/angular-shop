import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../items/item.model';

import { CartItem } from './store/cart.actions';
import * as CartActions from './store/cart.actions';
import * as fromApp from '../store/app.reducer';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store: Store<fromApp.AppState>) { }

  addItemToCart(item: Item, size: string) {
    this.store.dispatch(new CartActions.AddItem({item, size}));
    this.saveCartToStorage();
  }

  saveCartToStorage() {
    this.store.select("cart").subscribe((cart) => {
      localStorage.setItem("cart", JSON.stringify(cart.cartItems));
    });
  }

  deleteStorageCart() {
    localStorage.removeItem("cart");
  }

  loadStorageCart() {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      const cartItems: CartItem[] = <CartItem[]> JSON.parse(cartString);
      this.store.dispatch(new CartActions.ReplaceCart(cartItems));
    }
  }

  removeItem(index: number) {
    this.store.dispatch(new CartActions.DeleteItem(index))
    this.saveCartToStorage();
  }

}
