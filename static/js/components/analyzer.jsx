import React from 'react';
import PropTypes from 'prop-types';

import Utils from '../utils/analyzer_utils';
// look for kibitzAs for using CP in near endgame.

const MoveDisplayer = (props) => {
  const moves = props.moves.map(move => (
    <tr key={move.order}>
      <td>
        {move.pos} {move.play}
      </td>
      <td>
        {move.score}
      </td>
      <td>
        {move.leave}
      </td>
      <td>
        {move.equity.toFixed(1)}
      </td>
      <td>
        {move.winPct.toFixed(2)}
      </td>
    </tr>
  ));

  const iterations = props.iterationCounter ? (
    <span>Iterations: {props.iterationCounter}</span>
  ) : null;

  return (
    <div>
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>Play</th>
            <th>Score</th>
            <th>Leave</th>
            <th>Valuation</th>
            <th>Win %</th>
          </tr>
        </thead>
        <tbody>
          {moves}
        </tbody>
      </table>
      {iterations}
    </div>
  );
};

MoveDisplayer.defaultProps = {
  iterationCounter: null,
};

MoveDisplayer.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.number.isRequired,
    pos: PropTypes.string.isRequired,
    play: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    leave: PropTypes.string.isRequired,
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

    this.quackle = null;
  }

  setup() {
    if (this.props.gcg === '') {
      window.console.log('Error - no original game');
      return;
    }
    if (!this.quackle) {
      this.quackle = new window.Module.API();
      this.quackle.startup();
      // XXX: Search for Module.getPreloadedPackage() to handle data download.
    }
    // This function loads the game and players inside the c++ emscripten code.
    // That c++ function _calls_ Globals.getGameGCG to get the GCG string.
    // We do it this way because Unicode handling still sucks in 2018.
    // Javascript uses UTF-16 and they haven't fixed this yet.
    this.quackle.loadGameAndPlayers();
    const kibitzResults = this.quackle.setupSimulator(
      this.props.playerID,
      this.props.turnNumber,
    );
    const parseRes = Utils.parseMoves(kibitzResults);
    this.setState({
      moves: parseRes.moves,
      iterationCounter: parseRes.iterationCounter,
    });
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
    const result = this.quackle.simulateIter(stepSize, plies);
    const parseRes = Utils.parseMoves(result, true);
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
