import React from 'react';
import PropTypes from 'prop-types';

const MoveDisplayer = (props) => {
  const moves = props.moves.map(move => (
    <li>
      {move.order} {move.pos} {move.play} {move.score} {move.equity} {move.winPct}
    </li>
  ));

  const iterations = props.iterationCounter ? (
    <span>Iterations: {props.iterationCounter}</span>
  ) : null;

  return (
    <div>
      <ul>
        {moves}
      </ul>
      {iterations}
    </div>
  );
};

const MOVE_PARSE_REGEX = /(\w+) ([\w.]+) \(score = (\d+), equity = ([\d.]+), win% = ([\d.]+)\)/;

MoveDisplayer.defaultProps = {
  iterationCounter: null,
};

MoveDisplayer.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.number.isRequired,
    pos: PropTypes.string.isRequired,
    play: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    equity: PropTypes.number.isRequired, // equity is king
    winPct: PropTypes.number.isRequired,
  })).isRequired,
  iterationCounter: PropTypes.number,
};

class Analyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      iterationCounter: null,
      simulating: false,
    };
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.simulate = this.simulate.bind(this);
    this.simulateTimer = null;
  }

  setup() {
    if (this.props.gcg === '') {
      window.console.log('Error - no original game');
      return;
    }
    if (!window.ScriptackleInitialized) {
      window.Module.startup();
      // XXX: Search for Module.getPreloadedPackage() to handle data download.
      window.ScriptackleInitialized = true;
    }
    // This function loads the game and players inside the c++ emscripten code.
    // That c++ function _calls_ Globals.getGameGCG to get the GCG string.
    // We do it this way because Unicode handling still sucks in 2018.
    // Javascript uses UTF-16 and they haven't fixed this yet.
    window.Module.loadGameAndPlayers();
    const kibitzResults = window.Module.setupSimulator(
      this.props.playerID,
      this.props.turnNumber,
    );
    const parseRes = this.parseMoves(kibitzResults);
    this.setState({
      moves: parseRes.moves,
      iterationCounter: parseRes.iterationCounter,
    });
  }

  parseMoves(moveString, hasIterationCounter) {
    window.console.log(moveString);
    // if (hasIterationCounter) {
    //   window.console.log(hasIterationCounter);
    // }
    this.shutup = true;
    // Split and remove empty values.
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
          winPct: parseFloat(matches[5]),
        };
      }),
      iterationCounter,
    };
  }

  toggleSimulation() {
    this.setState((oldState) => {
      return {
        simulating: !oldState.simulating,
      };
    }, () => {
      if (!this.state.simulating) {
        if (this.simulateTimer) {
          window.clearTimeout(this.simulateTimer);
        }
      } else {
        // We just started a simulation.
        this.simulateTimer = window.setTimeout(this.simulate, 0);
      }
    });
  }

  // Run an iteration of simulations, and set a timer to simulate again.
  simulate() {
    const stepSize = 10;
    const plies = 2;
    const result = window.Module.simulateIter(stepSize, plies);
    const parseRes = this.parseMoves(result, true);
    this.setState({
      moves: parseRes.moves,
      iterationCounter: parseRes.iterationCounter,
    });

    // Allow event loop to run so we don't freeze the browser.
    this.simulateTimer = window.setTimeout(this.simulate, 0);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <h3>Analyzer</h3>
        <h4>Choices</h4>
        <MoveDisplayer
          moves={this.state.moves}
          iterationCounter={this.state.iterationCounter}
        />
        <button
          type="button"
          className="btn btn-info"
          onClick={this.toggleSimulation}
        >Simulate
        </button>
      </div>
    );
  }
}

Analyzer.propTypes = {
  playerID: PropTypes.number.isRequired,
  turnNumber: PropTypes.number.isRequired,
  gcg: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Analyzer;
