import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';

import * as fromApp from '../store/app.reducer';
import * as CartActions from '../cart/store/cart.actions';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { State } from '../user.reducer';
import { CartService } from '../cart/cart.service';
import { ItemsService } from '../items/items.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: Observable<State> | undefined;
  loggedIn = false;
  username = "";

  constructor(private userService: UserService, private cartService: CartService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.loadStateFromLocalStorage();
    this.user = this.store.select("user");
    this.user.subscribe((state) => {
      this.loggedIn = (state.user !== null);
      if (this.loggedIn) {
        this.username = state.user!.email.split("@")[0];
      }
    });
  }

  private loadStateFromLocalStorage() {
    this.userService.autoLogin();
    this.cartService.loadStorageCart();

  }

  onLogOut() {
    this.userService.logOut();
    this.store.dispatch(new CartActions.EmptyCart());
    this.cartService.deleteStorageCart();
  }

}
