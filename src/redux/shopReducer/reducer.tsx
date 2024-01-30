import {ADD_TO_CART, CLEAR_CART, UPDATE_CART} from './action';

const initialState = {
  cart: [],
  checkout: false,
};
const shopReducer = (
  state = initialState,
  action: {type: string; payload: any; newState?: any},
) => {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        ...action.newState,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default shopReducer;
