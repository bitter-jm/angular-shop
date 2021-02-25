import { Action } from '@ngrx/store';

import { Item } from '../../items/item.model';

export class CartItem {
  constructor (public item: Item, public size: string, public quantity: number) {}
}

export const ADD_ITEM = 'ADD_INGREDIENT';
export const INCREASE_AMOUNT = 'INCREASE_AMOUNT';
export const DECREASE_AMOUNT = 'DECREASE_AMOUNT';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EMPTY_CART = 'EMPTY_CART';
export const REPLACE_CART = 'REPLACE_CART';

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: {item: Item, size: string}) {}
}

export class IncreaseAmount implements Action {
  readonly type = INCREASE_AMOUNT;
  constructor(public payload: {index: number, quantity: number}) {}
}

export class DecreaseAmount implements Action {
  readonly type = DECREASE_AMOUNT;
  constructor(public payload: {index: number, quantity: number}) {}
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: number) {}
}

export class EmptyCart implements Action {
  readonly type = EMPTY_CART;
}

export class ReplaceCart implements Action {
  readonly type = REPLACE_CART;
  constructor(public payload: CartItem[]) {}
}

export type CartActions =
  | AddItem
  | IncreaseAmount
  | DecreaseAmount
  | DeleteItem
  | EmptyCart
  | ReplaceCart;
