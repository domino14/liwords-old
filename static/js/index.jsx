import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

import RootContainer from './containers/root_container';

const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history),
)(createStore);

const store = createStoreWithMiddleware(rootReducer, {});

const root = () => (
  <RootContainer
    gameID={window.Globals.gameID}
    viewMode={window.Globals.viewMode}
    gameRepr={window.Globals.gameRepr}
  />);

console.log('provider', Provider);
console.log('connectedrouter', ConnectedRouter);
console.log('Route', Route);
console.log('root', root);
console.log('store', store);
console.log('history', history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route
        path="/crosswords"
        component={root}
      />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main-app-content'),
);

/**

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically  }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

 */
