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
    expect(thisState.tilesLayout()).toEqual([
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
    expect(thisState.lastPlayedLetters).toEqual({
      R13C14: true,
      R14C14: true,
    });
    expect(thisState.latestScore('leesa')).toBe(112);
    expect(thisState.latestScore('cesar')).toBe(99);
  });

  it('Should calculate another reasonably complex board setup', () => {
    const moveList = require('./move_list_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(moveList, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(6);
    expect(thisState.tilesLayout()).toEqual([
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
    expect(thisState.lastPlayedLetters).toEqual({
      R4C9: true,
      R6C9: true,
      R7C9: true,
      R8C9: true,
      R9C9: true,
      R10C9: true,
      R11C9: true,
    });
    expect(thisState.latestScore('leesa')).toBe(173);
    expect(thisState.latestScore('cesar')).toBe(60);
  });

  it('Should calculate a game summary', () => {
    const moveList = require('./move_list_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(moveList, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(6);
    expect(thisState.turns.leesa.length).toBe(4);
    expect(thisState.turns.cesar.length).toBe(3);
    expect(thisState.turns.leesa[3]).toEqual({
      pos: 'J5',
      summary: 'fICTIOUS',
      score: '+61',
      cumul: '173',
      turnIdx: 6,
      note: '',
    });
    expect(thisState.turns.cesar[2]).toEqual({
      pos: 'O7',
      summary: 'CONTEMN',
      score: '+14',
      cumul: '60',
      turnIdx: 5,
      note: [
        'oh no, i wasn\'t sure of CENTRA for some reason, and eventually saw ',
        'the possibility of a 9 with CONTEMN. CENTRA is clearly the star play ',
        'here, but CONTEMN ended up working out better for me.',
      ].join(''),
    });
  });

  it('Should calculate a game summary with a challenge', () => {
    const moveList = require('./move_list_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(moveList, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(8);
    expect(thisState.turns.leesa.length).toBe(4);
    expect(thisState.turns.cesar.length).toBe(4);
    expect(thisState.turns.leesa[3]).toEqual({
      pos: 'J5',
      summary: 'fICTIOUS',
      score: '+0',
      cumul: '112',
      // Note that this turn was edited, so turnIdx is still 6
      // This isn't really a bug but a choice. :P
      turnIdx: 6,
      challengedOff: true,
      note: '',
    });
    expect(thisState.turns.cesar[3]).toEqual({
      pos: 'O7',
      summary: 'CONTEMNER',
      score: '+39',
      cumul: '99',
      turnIdx: 8,
      note: [
        'i didn\'t immediately see any bingoes ending in E or R so this ',
        'seemed good. i sorta need a lot of good luck now',
      ].join(''),
    });
  });
});
