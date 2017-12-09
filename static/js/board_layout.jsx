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

class BoardLayoutCalculator {
  constructor(moveList, moveIndex, tileDistribution) {
    this.moveList = moveList;
    this.moveIndex = moveIndex;
  }

  computeLayout() {
    const layout = blankLayout();

    this.moveList.forEach((item, index) => {
      switch (item.moveType) {
        case MoveTypesEnum.SCORING_PLAY:
          // Properties: player, rack, row, column, direction, word,
          // signed score, cum score
          item.moveProperties.player


      }



    });
  }
}
