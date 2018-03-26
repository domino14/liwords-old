// XXX Need scoreAddition too

// const MOVE_PARSE_REGEX = /(\w+) ([()\w.]+) \(score = (-*\d+), equity = (-*[\d.]+), win% = (-*[\d.]+)\)/;


class AnalyzerUtils {
  static parseMoves(moveString, hasIterationCounter) {
    // if (hasIterationCounter) {
    //   window.console.log(hasIterationCounter);
    // }
    // Split and remove empty values.
    window.console.log(moveString);
    const moves = moveString.split('\n').filter(String);

    let iterationCounter = null;
    if (hasIterationCounter) {
      iterationCounter = parseInt(moves[moves.length - 1], 10);
      moves.pop();
    }

    return {
      moves: moves.map((moveStr, idx) => {
        const matches = moveStr.match(MOVE_PARSE_REGEX);
        return {
          order: idx,
          pos: matches[1],
          play: matches[2],
          score: parseFloat(matches[3]),
          equity: parseFloat(matches[4]),
          winPct: parseFloat(matches[5]) * 100,
        };
      }),
      iterationCounter,
    };
  }
}

export default AnalyzerUtils;
