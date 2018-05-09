import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import environment from './environment';
import game from './game';
import session from './session';
import viewer from './viewer';

const rootReducer = combineReducers({
  game,
  environment,
  session,
  viewer,

  router: routerReducer,
});

export default rootReducer;
