import { CartItem } from './cart.actions';
import * as CartActions from './cart.actions';
import { ActionsSubject } from '@ngrx/store';

export interface State {
  cartItems: CartItem[],
}

const initialState: State = {
  cartItems: [],
};

export function cartReducer(
  state: State = initialState,
  action: any
): State {
  switch (action.type) {

    case CartActions.ADD_ITEM:
      const found = state.cartItems.findIndex((cartItem) => {
        //console.log(cartItem.item.id, action.payload.item.id, cartItem.size, action.payload.size);
        return (cartItem.item.id == action.payload.item.id && cartItem.size == action.payload.size);
      });
      console.log(found);
      if (found < 0) {
        return {
          ...state,
          cartItems: [...state.cartItems, new CartItem(action.payload.item, action.payload.size, 1)]
        };
      } else {
        var newCartItems = [...state.cartItems];
        newCartItems[found] = new CartItem(newCartItems[found].item, newCartItems[found].size, newCartItems[found].quantity + 1)
        return {
          ...state,
          cartItems: newCartItems,
        };
      }

    case CartActions.INCREASE_AMOUNT:
      var newCartItems = [...state.cartItems];
      newCartItems[action.payload.index] = new CartItem(newCartItems[action.payload.index].item, newCartItems[action.payload.index].size, newCartItems[action.payload.index].quantity + 1)
      return {
        ...state,
        cartItems: newCartItems,
      };


    case CartActions.DECREASE_AMOUNT:
      if (state.cartItems[action.payload.index].quantity <= 1) return state;
      var newCartItems = [...state.cartItems];
      newCartItems[action.payload.index] = new CartItem(newCartItems[action.payload.index].item, newCartItems[action.payload.index].size, newCartItems[action.payload.index].quantity - 1)
      return {
        ...state,
        cartItems: newCartItems,
      };


    case CartActions.DELETE_ITEM:
      var newCartItems = [...state.cartItems];
      newCartItems.splice(action.payload, 1);
      return {
        ...state,
        cartItems: newCartItems,
      };

    case CartActions.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };

      case CartActions.REPLACE_CART:
      return {
        ...state,
        cartItems: [...action.payload],
      };

    default:
      return state;
  }
}
