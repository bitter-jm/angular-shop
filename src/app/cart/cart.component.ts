import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { CartItem } from './store/cart.actions';
import * as CartActions from './store/cart.actions';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private store: Store<fromApp.AppState>, private cartService: CartService) { }

  ngOnInit(): void {

    this.store.select("cart").subscribe((cartStore) => this.cartItems = cartStore.cartItems);

  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  getTotalPrice(): number {
    var sum = 0;
    this.cartItems.forEach((cartItem: CartItem) => {
      sum += cartItem.quantity * cartItem.item.price;
    });
    return sum;
  }

  onIncreaseAmount(i: number) {
    this.store.dispatch(new CartActions.IncreaseAmount({index: i, quantity: 1}));
    this.cartService.saveCartToStorage();
  }

  onDecreaseAmount(i: number) {
    if (this.cartItems[i].quantity <= 1) return;
    this.store.dispatch(new CartActions.DecreaseAmount({index: i, quantity: 1}));
    this.cartService.saveCartToStorage();
  }

}
