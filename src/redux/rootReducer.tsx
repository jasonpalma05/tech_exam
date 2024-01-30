import {combineReducers} from 'redux';
import shopReducer from './shopReducer/reducer';
const appReducer: any = combineReducers({
  shopReducer,
});

export default appReducer;
