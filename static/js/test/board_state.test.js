import { BoardState, BoardStateCalculator } from '../board_state';
import { CrosswordGameDistribution,
  WorldWildlifeFundDistribution } from '../tile_distributions';

let boardState;

describe('BoardState', () => {
  beforeEach(() => {
    boardState = new BoardState(CrosswordGameDistribution);
  });

  describe('Tracking', () => {
    it('Should track an add correctly', () => {
      boardState.addLetter(12, 10, 'F');
      expect(boardState.layout[190]).toBe('F');
      expect(boardState.pool.F).toBe(1);
    });

    it('Should track a remove correctly', () => {
      boardState.addLetter(12, 10, 'F');
      boardState.removeLetter(12, 10, 'F');
      expect(boardState.layout[190]).toBe(' ');
      expect(boardState.pool.F).toBe(2);
    });
  });
});


describe('TileDistributions', () => {
  it('Crossword Game should have 100 tiles', () => {
    expect(Object.keys(CrosswordGameDistribution).length).toBe(27);
    expect(Object.keys(CrosswordGameDistribution)
      .map(k => CrosswordGameDistribution[k])
      .reduce((acc, v) => acc + v)).toBe(100);
  });

  it('World Wildlife Fund should have 104 tiles', () => {
    expect(Object.keys(WorldWildlifeFundDistribution).length).toBe(27);
    expect(Object.keys(WorldWildlifeFundDistribution)
      .map(k => WorldWildlifeFundDistribution[k])
      .reduce((acc, v) => acc + v)).toBe(104);
  });
});

describe('BoardStateCalculator', () => {
  it('Should calculate a reasonably complex board setup', () => {
    const moveList = require('./move_list_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(moveList, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(8);
    expect(thisState.layoutString()).toEqual([
      '               ',
      '               ',
      '               ',
      '           K   ',
      '           N   ',
      '      HALITES  ',
      '     XU    A  C',
      '   WRUNG   DODO',
      '              N',
      '              T',
      '              E',
      '              M',
      '              N',
      '              E',
      '              R',
    ]);
    expect(thisState.pool).toEqual({
      A: 7,
      B: 2,
      C: 1,
      D: 2,
      E: 9,
      F: 2,
      G: 2,
      H: 1,
      I: 8,
      J: 1,
      K: 0,
      L: 3,
      M: 1,
      N: 2,
      O: 6,
      P: 2,
      Q: 1,
      R: 4,
      S: 3,
      T: 4,
      U: 2,
      V: 2,
      W: 1,
      X: 0,
      Y: 2,
      Z: 1,
      '?': 2,
    });
  });

  it('Should calculate another reasonably complex board setup', () => {
    const moveList = require('./move_list_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(moveList, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(6);
    expect(thisState.layoutString()).toEqual([
      '               ',
      '               ',
      '               ',
      '           K   ',
      '         f N   ',
      '      HALITES  ',
      '     XU  C A  C',
      '   WRUNG T DODO',
      '         I    N',
      '         O    T',
      '         U    E',
      '         S    M',
      '              N',
      '               ',
      '               ',
    ]);
    expect(thisState.pool).toEqual({
      A: 7,
      B: 2,
      C: 0,
      D: 2,
      E: 10,
      F: 2,
      G: 2,
      H: 1,
      I: 7,
      J: 1,
      K: 0,
      L: 3,
      M: 1,
      N: 2,
      O: 5,
      P: 2,
      Q: 1,
      R: 5,
      S: 2,
      T: 3,
      U: 1,
      V: 2,
      W: 1,
      X: 0,
      Y: 2,
      Z: 1,
      '?': 1,
    });
  });
});
