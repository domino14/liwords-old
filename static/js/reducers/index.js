import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import environment from './environment';
import game from './game';

const rootReducer = combineReducers({
  game,
  environment,
  router: routerReducer,
});

export default rootReducer;
