import { User } from './user.model';
import * as UserActions from './user.actions';
import { Action } from '@ngrx/store';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export function userReducer(
  state: State = initialState,
  action: any
): State {
  switch (action.type) {
    case UserActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user
      };
    case UserActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
