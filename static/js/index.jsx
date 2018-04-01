import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from './reducers';

import CrosswordAppContainer from './components/crossword_app_container';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <CrosswordAppContainer />
  </Provider>,
  document.getElementById('main-app-content'),
);

