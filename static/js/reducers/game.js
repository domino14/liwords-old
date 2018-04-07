/**
 * @fileOverview The game state reducer. This is fairly complex, but
 * the main reducer is named 'game' and is defined at the bottom of this
 * file. The remainder are helper classes that the reducer calls.
 */
import * as types from '../constants/action_types';
import { CrosswordGameDistribution } from '../constants/tile_distributions';
import { MoveTypesEnum } from '../constants/moves';


/* TODO: should be dependent on board dimensions in future.  */
export function blankLayout() {
  return new Array(225).fill(' ');
}

/**
 * Convert the layout array into an array of strings, for ease of display.
 * @return {Array.<string>}
 */
export function tilesLayout(layout1DArray) {
  const layout = [];
  for (let j = 0; j < 15; j += 1) {
    // row by row
    const x = j * 15;
    const sl = layout1DArray.slice(x, x + 15);
    layout.push(sl.join(''));
  }
  return layout;
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) {
    return str;
  }
  return str.substr(0, index) + chr + str.substr(index + 1);
}

export class GameStateHelper {
  // This class holds the layout of the board as well as the remaining pool.
  constructor(tileDistribution, players) {
    this.layout = blankLayout();
    this.currentRack = '';
    this.currentUser = null;
    this.tileDistribution = tileDistribution;
    // tileDistribution should be a map of letter distributions
    // {A: 9, ?: 2, B: 2, etc}
    this.pool = Object.assign({}, tileDistribution);
    this.turns = {};
    this.lastPlayedLetters = {};
    this.players = players;
    if (this.players) {
      this.scores = {
        [players[0].nick]: 0,
        [players[1].nick]: 0,
      };
    } else {
      this.scores = {};
    }
  }

  /**
   * Add a letter at the row, col position. Also, remove letter from pool.
   * XXX: make dependent on board size.
   * @param {number} row A 0-indexed row (0-14)
   * @param {number} col A 0-indexed column (0-14)
   * @param {string} letter
   */
  addLetter(row, col, letter) {
    this.layout[(row * 15) + col] = letter;
    if (letter.toUpperCase() !== letter) {
      this.pool['?'] -= 1;
    } else {
      this.pool[letter] -= 1;
    }
  }
  /**
   * Remove a letter from the row, col position, and add back into pool.
   * @param  {number} row A 0-indexed row
   * @param  {number} col A 0-indexed col
   * @param  {string} letter
   */
  removeLetter(row, col, letter) {
    this.layout[(row * 15) + col] = ' ';
    if (letter.toUpperCase() !== letter) {
      if (this.pool['?']) {
        this.pool['?'] += 1;
      } else {
        this.pool['?'] = 1;
      }
    } else if (this.pool[letter]) {
      this.pool[letter] += 1;
    } else {
      this.pool[letter] = 1;
    }
  }
  /**
   * This is a utility function to remove a series of letters from the pool.
   * @param  {string} rack A rack of letters
   */
  removeFromPool(rack) {
    for (let i = 0; i < rack.length; i += 1) {
      this.pool[rack[i]] -= 1;
    }
  }

  /**
   * Return the letter at the given row, col.
   * @param  {number} row
   * @param  {number} col
   * @return {string}
   */
  letterAt(row, col) {
    return this.layout[(row * 15) + col];
  }
  /**
   * Pushes a new turn for the given user.
   */
  pushNewTurn(nickname, turnRepr) {
    if (!this.turns[nickname]) {
      this.turns[nickname] = [];
    }
    this.turns[nickname].push(turnRepr);
    this.scores[nickname] = parseInt(turnRepr.cumul, 10);
    this.latestTurn = turnRepr;
  }
  modifyLastTurn(nickname, modification) {
    const lastIdx = this.turns[nickname].length - 1;
    this.turns[nickname][lastIdx] = Object.assign(
      this.turns[nickname][lastIdx],
      modification,
    );
    this.scores[nickname] = parseInt(this.turns[nickname][lastIdx].cumul, 10);
    this.latestTurn = this.turns[nickname][lastIdx];
  }
  latestScore(nickname) {
    if (!this.turns[nickname]) {
      return 0;
    }
    const lastIdx = this.turns[nickname].length - 1;
    if (lastIdx >= 0) {
      return parseInt(this.turns[nickname][lastIdx].cumul, 10);
    }
    return 0;
  }
  // latestTurnForPlayer(nickname) {
  //   if (!this.turns[nickname]) {
  //     return null;
  //   }
  //   return this.turns[nickname][this.turns[nickname].length - 1];
  // }

  // latestTurn() {
  //   if (!this.players[0]) {
  //     return null;
  //   }
  //   const player1 = this.players[0].nick;
  //   const player2 = this.players[1].nick;
  //   if (!this.turns[player1]) {
  //     return null;
  //   }
  //   if (!this.turns[player2]) {
  //     return this.latestTurnForPlayer(player1);
  //   }

  //   if (this.turns[player1].length > this.turns[player2].length) {
  //     return this.latestTurnForPlayer(player1);
  //   }
  //   // Otherwise, they are the same size (or player2 is greater) so player2
  //   // is the last turn.
  //   return this.latestTurnForPlayer(player2);
  // }

  clearLastPlayedLetters() {
    this.lastPlayedLetters = {};
  }

  setLastPlayedLetter(row, col) {
    this.lastPlayedLetters[`R${row}C${col}`] = true;
  }

  toDict() {
    return {
      lastPlayedLetters: this.lastPlayedLetters,
      perPlayerTurns: this.turns,
      scores: this.scores,
      pool: this.pool,
      tilesLayout: tilesLayout(this.layout),
      latestTurn: this.latestTurn,
    };
  }
}

function trackPlay(idx, item, boardState, addOrRemove, optRemovedItem) {
  let f;
  boardState.clearLastPlayedLetters();
  if (addOrRemove === 'add') {
    f = boardState.addLetter.bind(boardState);
  } else if (addOrRemove === 'remove') {
    f = boardState.removeLetter.bind(boardState);
  }
  let { play } = item;
  for (let i = 0; i < item.play.length; i += 1) {
    const letter = item.play[i];
    const row = item.dir === 'v' ? item.row + i : item.row;
    const col = item.dir === 'h' ? item.col + i : item.col;
    if (letter !== '.') {
      f(row, col, letter);
      if (addOrRemove === 'add') {
        boardState.setLastPlayedLetter(row, col);
      }
    } else {
      play = setCharAt(play, i, boardState.letterAt(row, col));
    }
  }
  // Now push a summary of the play
  if (addOrRemove === 'add') {
    boardState.pushNewTurn(item.nick, {
      pos: item.pos,
      summary: play,
      score: `+${item.score}`,
      cumul: item.cumul,
      turnIdx: idx,
      note: item.note,
      nick: item.nick,
      type: MoveTypesEnum.SCORING_PLAY,
      rack: item.rack,
    });
  } else if (addOrRemove === 'remove') {
    // This is the only case in which we go back and edit the previous
    // item.
    boardState.modifyLastTurn(item.nick, {
      challengedOff: true,
      score: '+0',
      cumul: optRemovedItem.cumul,
      note: optRemovedItem.note,
    });
  }
  return boardState;
}

function processGameItem(accumGameState, item, idx, itemArr) {
  switch (item.type) {
    case MoveTypesEnum.SCORING_PLAY:
      return trackPlay(idx, item, accumGameState, 'add');
    case MoveTypesEnum.CHALLENGE_OFF:
      return trackPlay(idx, itemArr[idx - 1], accumGameState, 'remove', item);
    case MoveTypesEnum.PASS:
      accumGameState.pushNewTurn(item.nick, {
        pos: '',
        summary: 'Pass',
        score: '+0',
        cumul: item.cumul,
        turnIdx: idx,
        note: item.note,
        nick: item.nick,
        type: MoveTypesEnum.PASS,
        rack: item.rack,
      });
      return accumGameState;
    case MoveTypesEnum.EXCHANGE:
      accumGameState.pushNewTurn(item.nick, {
        pos: '',
        summary: `Exchange ${item.exchanged}`,
        score: '+0',
        cumul: item.cumul,
        turnIdx: idx,
        note: item.note,
        nick: item.nick,
        type: MoveTypesEnum.EXCHANGE,
        rack: item.rack,
      });
      return accumGameState;
    case MoveTypesEnum.ENDGAME_POINTS:
      accumGameState.pushNewTurn(item.nick, {
        pos: '',
        summary: `2 × (${item.rack})`,
        score: `+${item.score}`,
        cumul: item.cumul,
        turnIdx: idx,
        note: item.note,
        nick: item.nick,
        type: MoveTypesEnum.ENDGAME_POINTS,
        rack: item.rack,
      });
      return accumGameState;
    default:
      return accumGameState;
  }
}

function computeMoveIndexState(state, moveIndex) {
  const addlGameState = new GameStateHelper(CrosswordGameDistribution, state.players);
  // moveIndex starts at -1, to signify the turn before the game ever
  // starts.
  const turn = state.turns[moveIndex + 1];
  if (turn &&
      turn.type !== MoveTypesEnum.CHALLENGE_OFF &&
      turn.type !== MoveTypesEnum.ENDGAME_POINTS) {
    addlGameState.currentRack = turn.rack;
  } else {
    addlGameState.currentRack = '';
  }
  const currentUser = (turn ? turn.nick : '');
  // Because computers are fast and I'm lazy, we're going to reevaluate
  // the game to this point. We should change this if it's slow, but
  // crossword games are short and fairly simple.
  const finalGameState = state
    .turns.slice(0, moveIndex + 1) // only evaluate up to the move index
    .reduce(processGameItem, addlGameState);

  return {
    currentRack: addlGameState.currentRack,
    currentUser,
    ...finalGameState.toDict(),
  };
}

const initialState = {
  // These parameters come from the server.
  players: [],
  version: null,
  turns: [],

  // These are injected by the reducer. The initial index being -1 is
  // a convention we use here. At the beginning of a game, there hasn't
  // been a turn yet.
  // It will be turn 0 when the very first play has been made.
  moveIndex: -1,
  currentRack: '',
  currentUser: '',
  perPlayerTurns: {},
  pool: {
    ...CrosswordGameDistribution,
  },
  lastPlayedLetters: {},
  tilesLayout: tilesLayout(blankLayout()),
};

// The main reducer for this function is defined here.

const game = (state = initialState, action) => {
  switch (action.type) {
    case types.GAME_LOAD:
      return {
        ...initialState,
        moveIndex: -1,
        players: action.payload.players,
        version: action.payload.version,
        turns: action.payload.turns,
      };
    case types.GAME_FORWARD:
      return {
        ...state,
        ...computeMoveIndexState(state, state.moveIndex + 1),
        moveIndex: state.moveIndex + 1,
      };
    case types.GAME_BACKWARD:
      return {
        ...state,
        ...computeMoveIndexState(state, state.moveIndex - 1),
        moveIndex: state.moveIndex - 1,
      };
    case types.GAME_FAST_FORWARD:
      return {
        ...state,
        ...computeMoveIndexState(state, state.turns.length - 1),
        moveIndex: state.turns.length - 1,
      };
    case types.GAME_FAST_BACKWARD:
      return {
        ...state,
        ...computeMoveIndexState(state, -1),
        moveIndex: -1,
      };
    case types.GAME_VIEWER_SEEK:
      return {
        ...state,
        ...computeMoveIndexState(state, action.turnIdx),
        moveIndex: action.turnIdx,
      };
    default:
      // Must always define a default.
      return state;
  }
};


export default game;
