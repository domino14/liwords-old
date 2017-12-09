/**
 * @fileOverview A "move" is a representation of a set of tiles.
 */

const MoveTypesEnum = {
  SCORING_PLAY: 1,
  PASS: 2,
  // Note: GCG does not specifically have a note for an incorrect challenge,
  // and Quackle just implicitly treats it as a pass. We will do the same
  // for now, for compatibility.
  CHALLENGE_OFF: 3, // Withdrawal of challenged phoney.
  CHALLENGE_BONUS: 4,
  EXCHANGE: 5,
  ENDGAME_POINTS: 6,
  TIME_PENALTY: 7,
};

class Move {
  constructor(moveType, properties) {
    this.moveType = moveType;
    this.moveProperties = properties;
  }
}

export default Move;
export { MoveTypesEnum };
