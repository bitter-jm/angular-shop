import { CartItem } from './cart.actions';
import * as CartActions from './cart.actions';

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
      return {
        ...state,
        cartItems: [...state.cartItems, new CartItem(action.payload, 1)]
      };


    case CartActions.INCREASE_AMOUNT:
      var newCartItems = [...state.cartItems];
      newCartItems[action.payload.index] = new CartItem(newCartItems[action.payload.index].item, newCartItems[action.payload.index].quantity + 1)
      return {
        ...state,
        cartItems: newCartItems,
      };


    case CartActions.DECREASE_AMOUNT:
      if (state.cartItems[action.payload.index].quantity <= 1) return state;
      var newCartItems = [...state.cartItems];
      newCartItems[action.payload.index] = new CartItem(newCartItems[action.payload.index].item, newCartItems[action.payload.index].quantity - 1)
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


    default:
      return state;
  }
}
