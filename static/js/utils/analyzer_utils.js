// XXX Need scoreAddition too

class AnalyzerUtils {
  static parseMoves(moveString, hasIterationCounter) {
    // if (hasIterationCounter) {
    //   window.console.log(hasIterationCounter);
    // }
    // Split and remove empty values.
    const moves = moveString.split('\n').filter(String);

    let iterationCounter = null;
    if (hasIterationCounter) {
      iterationCounter = parseInt(moves[moves.length - 1], 10);
      moves.pop();
    }

    return {
      moves: moves.map((moveStr, idx) => {
        const reducer = (accum, curValue) => {
          const [key, value] = curValue.split(':');
          // -- how the hell else is a reducer supposed to work? :
          accum[key] = value; // eslint-disable-line no-param-reassign
          return accum;
        };

        const tokens = moveStr.split(',').reduce(reducer, {});

        return {
          order: idx,
          pos: tokens.pos,
          play: tokens.tiles,
          leave: tokens.leave,
          score: parseFloat(tokens.score),
          equity: parseFloat(tokens.equity),
          winPct: parseFloat(tokens.win) * 100,
        };
      }),
      iterationCounter,
    };
  }
}

export default AnalyzerUtils;
