import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/cart/store/cart.actions';
import * as fromApp from '../../store/app.reducer';
import * as CartActions from '../../cart/store/cart.actions';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent implements OnInit {

  cartItems: CartItem[] = [];
  showCartPreview = false;

  constructor(private store: Store<fromApp.AppState>, private cartService: CartService) { }

  ngOnInit(): void {
    this.store.select("cart").subscribe((cart) => {
      this.cartItems = cart.cartItems;
    });
  }

  onMouseEnter() {
    this.showCartPreview = true;
  }

  onMouseLeave() {
    this.showCartPreview = false;
  }

  getTotalPrice(): number {
    var sum = 0;
    this.cartItems.forEach((cartItem: CartItem) => {
      sum += cartItem.quantity * cartItem.item.price;
    });
    return sum;
  }

  onRemoveItem(index: number) {
    this.cartService.removeItem(index);
  }

}
