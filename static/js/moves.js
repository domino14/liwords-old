/**
 * @fileOverview A "move" is a representation of a set of tiles.
 */

const MoveTypesEnum = {
  SCORING_PLAY: 'move',
  PASS: 'pass',
  // Note: GCG does not specifically have a note for an incorrect challenge,
  // and Quackle just implicitly treats it as a pass. We will do the same
  // for now, for compatibility.
  CHALLENGE_OFF: 'lost_challenge', // Withdrawal of challenged phoney.
  CHALLENGE_BONUS: 'challenge_bonus',
  EXCHANGE: 'exchange',
  ENDGAME_POINTS: 'end_rack_points',
  TIME_PENALTY: 'time_penalty',
};

class Move {
  constructor(moveType, properties) {
    this.moveType = moveType;
    this.moveProperties = properties;
  }
}

export default Move;
export { MoveTypesEnum };
