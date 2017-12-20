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
  constructor(tileDistribution, layout) {
    this.layout = layout || blankLayout();
    this.currentRack = '';
    this.currentUser = null;
    this.tileDistribution = tileDistribution;
    // tileDistribution should be a map of letter distributions
    // {A: 9, ?: 2, B: 2, etc}
    this.pool = Object.assign({}, tileDistribution);
  }

  /**
   * Convert the layout array into an array of strings, for ease of display.
   * @return {Array.<string>}
   */
  layoutString() {
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
}

class BoardStateCalculator {
  constructor(moveList, tileDistribution) {
    this.moveList = moveList;
    this.tileDistribution = tileDistribution;
  }

  /**
   * Compute the layout at the given move index. Only matters for scoring
   * plays and withdrawn challenges, as other events do not change the board
   * layout or the pool.
   * @param {number} moveIndex
   * @return {BoardState}
   */
  computeLayout(moveIndex) {
    let boardState = new BoardState(this.tileDistribution);
    // The current rack is the rack that the move at moveIndex is being
    // made from. We should add 1 to to moveIndex to get the rack
    boardState.currentRack = (this.moveList[moveIndex + 1] ?
      this.moveList[moveIndex + 1].rack : '');
    boardState.currentUser = (this.moveList[moveIndex + 1] ?
      this.moveList[moveIndex + 1].nick : '');
    for (let i = 0; i <= moveIndex; i += 1) {
      const item = this.moveList[i];
      switch (item.type) {
        case MoveTypesEnum.SCORING_PLAY:
          boardState = this.trackPlay(item, boardState, 'add');
          break;
        case MoveTypesEnum.CHALLENGE_OFF:
          // Note that a challenged off play always comes immediately
          // after the "scoring play" event. The challenged off play
          // does not have positional info, so we just use the old event.
          boardState = this.trackPlay(this.moveList[i - 1], boardState, 'remove');
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
   * @param {Object} item A representation of a scoring play.
   * @param {BoardState} boardState An existing board state to be added to.
   * @param {string} addOrRemove
   * @return {BoardState}
   */
  trackPlay(item, boardState, addOrRemove) {
    let f;
    if (addOrRemove === 'add') {
      f = boardState.addLetter.bind(boardState);
    } else if (addOrRemove === 'remove') {
      f = boardState.removeLetter.bind(boardState);
    }
    for (let i = 0; i < item.play.length; i += 1) {
      const letter = item.play[i];
      const row = item.dir === 'v' ? item.row + i : item.row;
      const col = item.dir === 'h' ? item.col + i : item.col;
      if (letter !== '.') {
        f(row, col, letter);
      }
    }
    return boardState;
  }
}

export { BoardState, BoardStateCalculator };