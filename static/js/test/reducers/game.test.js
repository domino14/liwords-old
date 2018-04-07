import * as types from '../../constants/action_types';

import game, {
  GameStateHelper, tilesLayout,
  blankLayout,
} from '../../reducers/game';

import { CrosswordGameDistribution,
  WorldWildlifeFundDistribution } from '../../constants/tile_distributions';

let boardState;

describe('Base Reducer', () => {
  it('Should return the default initialState', () => {
    const state = game(undefined, {
      type: 'FAKE_TEST_ACTION',
    });
    expect(state).toEqual({
      players: [],
      version: null,
      turns: [],
      moveIndex: -1,
      currentRack: '',
      currentUser: '',
      perPlayerTurns: {},
      pool: {
        ...CrosswordGameDistribution,
      },
      lastPlayedLetters: {},
      tilesLayout: tilesLayout(blankLayout()),
    });
  });
});

describe('GameStateHelper', () => {
  beforeEach(() => {
    boardState = new GameStateHelper(CrosswordGameDistribution);
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

describe('Initial game load', () => {
  const testGame = require('../test_game_1.json'); // eslint-disable-line global-require
  const firstState = game(undefined, {
    type: types.GAME_LOAD,
    payload: {
      ...testGame,
    },
  });
  expect(firstState.players[0].nick).toBe('leesa');
  expect(firstState.players[1].nick).toBe('cesar');
  expect(firstState.turns.length).toBe(31);
  expect(firstState.moveIndex).toBe(-1);
});

describe('Initial game load with first turn', () => {
  // We should model this as two actions; the initial game load, and
  // then a "seek" to the current move index (-1).
  // XXX: This might be a bit ugly and worth revisiting.
  const testGame = require('../test_game_1.json'); // eslint-disable-line global-require
  const firstState = game(undefined, {
    type: types.GAME_LOAD,
    payload: {
      ...testGame,
    },
  });
  const seekState = game(firstState, {
    type: types.GAME_VIEWER_SEEK,
    turnIdx: -1,
  });
  expect(seekState.players[0].nick).toBe('leesa');
  expect(seekState.players[1].nick).toBe('cesar');
  expect(seekState.turns.length).toBe(31);
  expect(seekState.moveIndex).toBe(-1);
  expect(seekState.currentRack).toBe('GNRUW');
  expect(seekState.currentUser).toBe('leesa');
  // Still an empty board:
  expect(seekState.tilesLayout).toEqual(tilesLayout(blankLayout()));
  // The state's pool tracks the letters that have not been played.
  // It is up to the display logic to subtract the current rack letters.
  // This is easiest and makes most sense.
  expect(seekState.pool).toEqual(CrosswordGameDistribution);
  expect(seekState.scores).toEqual({
    cesar: 0,
    leesa: 0,
  });
});

describe('Reducer with cases', () => {
  it('Should calculate a reasonably complex board setup', () => {
    const testGame = require('../test_game_1.json'); // eslint-disable-line global-require
    const firstState = game(undefined, {
      type: types.GAME_LOAD,
      payload: {
        ...testGame,
      },
    });
    const state = game(firstState, {
      type: types.GAME_VIEWER_SEEK,
      turnIdx: 8,
    });
    expect(state.tilesLayout).toEqual([
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
    expect(state.pool).toEqual({
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
    expect(state.lastPlayedLetters).toEqual({
      R13C14: true,
      R14C14: true,
    });
    expect(state.scores.leesa).toBe(112);
    expect(state.scores.cesar).toBe(99);
    console.log('State is', state);
    // expect(thisState.latestTurn()).toEqual({
    //   pos: 'O7',
    //   summary: 'CONTEMNER',
    //   score: '+39',
    //   cumul: '99',
    //   turnIdx: 8,
    //   note: [
    //     'i didn\'t immediately see any bingoes ending in E or R so this ',
    //     'seemed good. i sorta need a lot of good luck now',
    //   ].join(''),
    //   nick: 'cesar',
    //   type: 'move',
    //   rack: 'EEHIRRY',
    // });
  });

  it('Should calculate another reasonably complex board setup', () => {
    const testGame = require('./test_game_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(testGame, CrosswordGameDistribution);
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
    expect(thisState.latestTurn()).toEqual({
      pos: 'J5',
      summary: 'fICTIOUS',
      score: '+61',
      cumul: '173',
      turnIdx: 6,
      note: '',
      nick: 'leesa',
      type: 'move',
      rack: '?CIOSTU',
    });
  });

  it('Should calculate a game summary', () => {
    const testGame = require('./test_game_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(testGame, CrosswordGameDistribution);
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
      nick: 'leesa',
      type: 'move',
      rack: '?CIOSTU',
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
      nick: 'cesar',
      type: 'move',
      rack: 'CEMNNRT',
    });
  });

  it('Should calculate a game summary with a challenge', () => {
    const testGame = require('../test_game_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(testGame, CrosswordGameDistribution);
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
      nick: 'leesa',
      type: 'move',
      rack: '?CIOSTU',
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
      nick: 'cesar',
      type: 'move',
      rack: 'EEHIRRY',
    });
  });

  it('should calculate end-of-game turn appropriately, player 1 ends', () => {
    const testGame = require('../test_game_1.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(testGame, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(30);
    expect(thisState.turns.leesa.length).toBe(16);
    expect(thisState.turns.cesar.length).toBe(14);
    expect(thisState.turns.leesa[15]).toEqual({
      pos: '',
      summary: '2 × (AEV)',
      score: '+12',
      cumul: '347',
      turnIdx: 30,
      note: '',
      nick: 'leesa',
      type: 'end_rack_points',
      rack: 'AEV',
    });
    expect(thisState.turns.cesar[13]).toEqual({
      pos: 'E12',
      summary: 'ZITI',
      score: '+25',
      cumul: '417',
      turnIdx: 28,
      note: '',
      nick: 'cesar',
      type: 'move',
      rack: 'AEIITVZ',
    });
    expect(thisState.latestTurn()).toEqual(thisState.turns.leesa[15]);
  });

  it('should calculate end-of-game turn appropriately, player 2 ends', () => {
    const testGame = require('../test_game_2.json'); // eslint-disable-line global-require
    const calculator = new BoardStateCalculator(testGame, CrosswordGameDistribution);
    const thisState = calculator.computeLayout(27);
    expect(thisState.turns.doug.length).toBe(13);
    expect(thisState.turns.emely.length).toBe(14);
    expect(thisState.latestTurn()).toEqual(thisState.turns.emely[13]);
  });
});
