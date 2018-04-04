import { combineReducers } from 'redux';

import environment from './environment';
import game from './game';

const rootReducer = combineReducers({
  game,
  environment,
});

export default rootReducer;
