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
          const token = curValue.split(':');
          accum[token[0]] = token[1];
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
