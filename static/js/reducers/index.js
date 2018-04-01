import { combineReducers } from 'redux';

import environment from './environment';
import board from './board';

const rootReducer = combineReducers({
  board,
  environment,
});

export default rootReducer;
