import { Action } from '@ngrx/store';

import { Item } from '../../items/item.model';

export class CartItem {
  constructor (public item: Item, public quantity: number) {}
}

export const ADD_ITEM = 'ADD_INGREDIENT';
export const INCREASE_AMOUNT = 'INCREASE_AMOUNT';
export const DECREASE_AMOUNT = 'DECREASE_AMOUNT';
export const DELETE_ITEM = 'DELETE_ITEM';

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: Item) {}
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

export type CartActions =
  | AddItem
  | IncreaseAmount
  | DecreaseAmount
  | DeleteItem;
