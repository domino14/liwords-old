/**
 * @fileOverview Computes the layout of the tiles on a board, given a set
 * of `Move`s and a move index.
 */

import { MoveTypesEnum } from './moves';

/* TODO: should be dependent on board dimensions in future.  */
function blankLayout() {
  return new Array(225).fill(' ');
}

class BoardState {
  // Board state has the layout of the board as well as the remaining pool.
  // Other state classes in the future may have more info, such as the scores,
  // time penalties, time remaining, etc.
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
  }

  /**
   * Convert the layout array into an array of strings, for ease of display.
   * @return {Array.<string>}
   */
  tilesLayout() {
    const layout = [];
    for (let j = 0; j < 15; j += 1) {
      // row by row
      const x = j * 15;
      const sl = this.layout.slice(x, x + 15);
      layout.push(sl.join(''));
    }
    return layout;
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
  }
  modifyLastTurn(nickname, modification) {
    const lastIdx = this.turns[nickname].length - 1;
    this.turns[nickname][lastIdx] = Object.assign(
      this.turns[nickname][lastIdx],
      modification,
    );
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
  latestTurnForPlayer(nickname) {
    if (!this.turns[nickname]) {
      return null;
    }
    return this.turns[nickname][this.turns[nickname].length - 1];
  }

  latestTurn() {
    if (!this.players[0]) {
      return null;
    }
    const player1 = this.players[0].nick;
    const player2 = this.players[1].nick;
    if (!this.turns[player1]) {
      return null;
    }
    if (!this.turns[player2]) {
      return this.latestTurnForPlayer(player1);
    }

    if (this.turns[player1].length > this.turns[player2].length) {
      return this.latestTurnForPlayer(player1);
    }
    // Otherwise, they are the same size, so player2 is the last turn.
    return this.latestTurnForPlayer(player2);
  }
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) {
    return str;
  }
  return str.substr(0, index) + chr + str.substr(index + 1);
}

class BoardStateCalculator {
  constructor(gameRepr, tileDistribution) {
    this.moveList = gameRepr.turns;
    this.players = gameRepr.players;
    this.tileDistribution = tileDistribution;
  }

  /**
   * Compute the layout at the given move index. Only matters for scoring
   * plays and withdrawn challenges, as other events do not change the board
   * layout or the pool. This also computes the pool and the turn summary.
   * @param {number} moveIndex
   * @return {BoardState}
   */
  computeLayout(moveIndex) {
    let boardState = new BoardState(this.tileDistribution, this.players);
    // The current rack is the rack that the move at moveIndex is being
    // made from. We should add 1 to to moveIndex to get the rack
    if (this.moveList[moveIndex + 1] &&
        this.moveList[moveIndex + 1].type !== MoveTypesEnum.CHALLENGE_OFF &&
        this.moveList[moveIndex + 1].type !== MoveTypesEnum.ENDGAME_POINTS) {
      boardState.currentRack = this.moveList[moveIndex + 1].rack;
    } else {
      boardState.currentRack = '';
    }

    boardState.currentUser = (this.moveList[moveIndex + 1] ?
      this.moveList[moveIndex + 1].nick : '');
    for (let i = 0; i <= moveIndex; i += 1) {
      const item = this.moveList[i];
      if (!item) {
        break;
      }
      switch (item.type) {
        case MoveTypesEnum.SCORING_PLAY:
          boardState = this.trackPlay(i, item, boardState, 'add');
          break;
        case MoveTypesEnum.CHALLENGE_OFF:
          // Note that a challenged off play always comes immediately
          // after the "scoring play" event. The challenged off play
          // does not have positional info, so we just use the old event.
          boardState = this.trackPlay(i, this.moveList[i - 1], boardState, 'remove', item);
          break;
        case MoveTypesEnum.PASS:
          boardState.pushNewTurn(item.nick, {
            pos: '',
            summary: 'Pass',
            score: '+0',
            cumul: item.cumul,
            turnIdx: i,
            note: item.note,
            nick: item.nick,
            type: MoveTypesEnum.PASS,
            rack: item.rack,
          });
          break;
        case MoveTypesEnum.EXCHANGE:
          boardState.pushNewTurn(item.nick, {
            pos: '',
            summary: `Exchange ${item.exchanged}`,
            score: '+0',
            cumul: item.cumul,
            turnIdx: i,
            note: item.note,
            nick: item.nick,
            type: MoveTypesEnum.EXCHANGE,
            rack: item.rack,
          });
          break;
        case MoveTypesEnum.ENDGAME_POINTS:
          boardState.pushNewTurn(item.nick, {
            pos: '',
            summary: `2 × (${item.rack})`,
            score: `+${item.score}`,
            cumul: item.cumul,
            turnIdx: i,
            note: item.note,
            nick: item.nick,
            type: MoveTypesEnum.ENDGAME_POINTS,
            rack: item.rack,
          });
          break;
        default:
          // For everything else, there's Mastercard.
          break;
      }
    }
    return boardState;
  }
  /**
   * Compute the layout for a scoring play, given an existing layout and
   * a play.
   * @param {number} idx The index of the play in the overall game.
   * @param {Object} item A representation of a scoring play.
   * @param {BoardState} boardState An existing board state to be added to.
   * @param {string} addOrRemove
   * @param {Object} if addOrRemove is 'remove', this is the removed item.
   * @return {BoardState}
   */
  trackPlay(idx, item, boardState, addOrRemove, optRemovedItem) {
    let f;
    boardState.lastPlayedLetters = {};
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
          boardState.lastPlayedLetters[`R${row}C${col}`] = true;
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
}

export { BoardState, BoardStateCalculator };
