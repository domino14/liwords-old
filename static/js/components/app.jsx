// XXX DELETE ME SOON

import React from 'react';
import ReactDOM from 'react-dom';
import CrosswordAppContainer from './crossword_app_container';

class App {
  static initialize(options) {
    ReactDOM.render(
      <CrosswordAppContainer
        gameRepr={options.gameRepr}
        viewMode={options.viewMode}
        gameID={options.gameID}
      />,
      document.getElementById('main-app-content'),
    );
  }
}

export default App;
