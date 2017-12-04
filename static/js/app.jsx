import React from 'react';
import ReactDOM from 'react-dom';

import CrosswordAppContainer from './crossword_app_container';

class App {
  static initialize() {
    ReactDOM.render(
      <CrosswordAppContainer />,
      document.getElementById('main-app-content'),
    );
  }
}

export default App;
