import { ActionReducer, ActionReducerMap, combineReducers, compose } from '@ngrx/store';

import * as fromUser from '../user.reducer';
import * as fromCart from '../cart/store/cart.reducer';

export interface AppState {
  user: fromUser.State;
  cart: fromCart.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: fromUser.userReducer,
  cart: fromCart.cartReducer,
};
