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

const TEST_GAME_TILES = [
  '               ',
  ' OOH B LIP  P  ',
  '  DISUSE    L  ',
  'BREN R A  CUE  ',
  '    QI V FA W  ',
  '   RIN E UN    ',
  '  YE   N TO  T ',
  '  OF  JEEZE  R ',
  '  GI   D     O ',
  ' MAX V       I ',
  ' I EYESTONE  L ',
  ' C D G  HAdARIM',
  ' A           T ',
  ' STRATAl     E ',
  '      LONG     ',
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
        tilesLayout={TEST_GAME_TILES}
      />
    );
  }
}

export default CrosswordAppContainer;