import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import environment from './environment';
import game from './game';
import gamelist from './gamelist';
import session from './session';
import viewer from './viewer';

const rootReducer = combineReducers({
  game,
  environment,
  session,
  viewer,
  gamelist,

  router: routerReducer,
});

export default rootReducer;
