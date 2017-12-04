import React from 'react';

import Board from './board';

const SCRABBLE_BOARD = [
  `=  '   =   '  =`,
  ` -   "   "   - `,
  `  -   ' '   -  `,
  `'  -   '   -  '`,
  `    -     -    `,
  ` "   "   "   " `,
  `  '   ' '   '  `,
  `=  '   -   '  =`,
  `  '   ' '   '  `,
  ` "   "   "   " `,
  `    -     -    `,
  `'  -   '   -  '`,
  `  -   ' '   -  `,
  ` -   "   "   - `,
  `=  '   =   '  =`,
];

class CrosswordAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  render() {
    return (
      <Board
        gridWidth={15}
        gridHeight={15}
        boardWidth={500}
        boardHeight={500}
        gridLayout={SCRABBLE_BOARD}
        showBonusLabels
      />
    );
  }
}

export default CrosswordAppContainer;
