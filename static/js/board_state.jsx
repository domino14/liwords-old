/**
 * @fileOverview Computes the layout of the tiles on a board, given a set
 * of `Move`s and a move index.
 */

import { MoveTypesEnum } from './moves';

/* TODO: should be dependent on board dimensions in future.  */
function blankLayout() {
  const line = '               ';
  const layout = [];
  for (let i = 0; i < 15; i += 1) {
    layout.push(line);
  }
  return layout;
}

class BoardState {
  // Board state has the layout of the board as well as the remaining pool.
  // Other state classes in the future may have more info, such as the scores,
  // time penalties, time remaining, etc.
  constructor(tileDistribution, layout) {
    this.layout = layout || blankLayout();
    this.tileDistribution = tileDistribution;
  }
}


class BoardStateCalculator {
  constructor(moveList, moveIndex, tileDistribution) {
    this.moveList = moveList;
    this.moveIndex = moveIndex;
    this.tileDistribution = tileDistribution;
  }

  /**
   * Compute the layout at the given move index.
   * @param {number} moveIndex
   * @return {BoardState}
   */
  computeLayout(moveIndex) {
    let boardState = new BoardState(this.tileDistribution);

    for (let i = 0; i < moveIndex; i += 1) {
      const item = this.moveList[i];
      switch (item.type) {
        case MoveTypesEnum.SCORING_PLAY:
          boardState = this.addScoringPlay(item, boardState);
          break;
      }
    }
  }
  /**
   * Compute the layout for a scoring play, given an existing layout and
   * a play.
   * @param {Object} item A representation of a scoring play.
   * @param {BoardState} boardState An existing board state to be added to.
   * @return {BoardState}
   */
  addScoringPlay(item, boardState) {

  }
}
