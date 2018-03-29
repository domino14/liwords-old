import React from 'react';
import PropTypes from 'prop-types';

import Board from '../board/board';
import Scoreboard from '../scoreboard';
import Pool from '../pool';
import Scoresheet from '../scoresheet';
import Notes from '../notes';
import TurnsNavbar from './turns_navbar';
import { MoveTypesEnum } from '../moves';
import Analyzer from './analyzer';

import { BoardStateCalculator } from '../board_state';
import { CrosswordGameDistribution } from '../tile_distributions';
import { CrosswordGameSetup } from '../board_setups';

const turnFromLocation = () => {
  if (window.location.hash.startsWith('#')) {
    const turn = parseInt(window.location.hash.substring(1), 10);
    if (Number.isNaN(turn)) {
      return -1;
    }
    return Math.max(turn - 1, -1);
  }
  return -1;
};

class Viewer extends React.Component {
  constructor(props) {
    super(props);

    const currentTurn = turnFromLocation();
    this.state = {
      // 0 would mean the very first turn; this is -1 instead as we start
      // with a blank board.
      currentTurn,
      showAnalyzer: false,
    };
    this.stepForward = this.stepForward.bind(this);
    this.stepBackward = this.stepBackward.bind(this);
    this.fastForward = this.fastForward.bind(this);
    this.fastBackward = this.fastBackward.bind(this);
    this.analyze = this.analyze.bind(this);

    this.hashChange = this.hashChange.bind(this);
    this.onTurnClick = this.onTurnClick.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);

    window.onhashchange = this.hashChange;
    this.lastClickedTurn = currentTurn;
    // The player whose turn it is (0 or 1)
    this.curPlayerID = 0;
    // The current turn number with regards to the player. Turn 8 here
    // is the player's 8th turn, as opposed to the global "currentTurn"
    // above which is a bit more like an event counter.
    this.curPlayerTurn = 0;
  }

  componentDidMount() {
    // The viewer should request all comments on mount, if there is a game ID.
    if (!this.props.gameID) {
      return;
    }
    this.props.requestComments();
  }

  onTurnClick(idx) {
    this.lastClickedTurn = idx;
    window.location.hash = idx;
    this.setState({
      currentTurn: idx - 1,
    });
  }

  onSubmitComment(comment) {
    this.props.submitComment(comment, this.state.currentTurn);
  }

  onDeleteComment(uuid) {
    console.log('Want to delete comment iwth uuid', uuid);
    this.props.deleteComment(uuid);
  }


  hashChange() {
    // -1 because we use user-friendly hashes for turns -- there is no
    // turn zero (that's the start of the game, before anyone has gone).
    // Internally, we treat that as turn `-1` -- see above default
    // value of currentTurn
    if (this.lastClickedTurn === window.location.hash.substring(1)) {
      // This hash change was created by clicking on a turn, so let's
      // ignore this. We only want to modify the state when the hash
      // changes on load or by typing in a new hash.
      return;
    }
    this.setState({
      currentTurn: turnFromLocation(),
    });
  }

  stepForward() {
    const maxTurnIndex = this.props.gameRepr.turns.length - 1;
    this.setState((prevState) => {
      const newTurn = Math.min(prevState.currentTurn + 1, maxTurnIndex);
      this.lastClickedTurn = newTurn + 1;
      window.location.hash = newTurn + 1;
      return {
        currentTurn: newTurn,
      };
    });
  }

  stepBackward() {
    this.setState((prevState) => {
      const newTurn = Math.max(prevState.currentTurn - 1, -1);
      window.location.hash = newTurn + 1;
      this.lastClickedTurn = newTurn + 1;
      return {
        currentTurn: newTurn,
      };
    });
  }

  fastForward() {
    const maxTurnIndex = this.props.gameRepr.turns.length - 1;
    window.location.hash = maxTurnIndex + 1;
    this.lastClickedTurn = maxTurnIndex + 1;
    this.setState({
      currentTurn: maxTurnIndex,
    });
  }

  fastBackward() {
    window.location.hash = 0;
    this.lastClickedTurn = 0;
    this.setState({
      currentTurn: -1,
    });
  }

  analyze() {
    this.analyzer.setup();
    this.setState({
      showAnalyzer: true,
    });
  }

  render() {
    const boardStateCalculator = new BoardStateCalculator(
      this.props.gameRepr,
      CrosswordGameDistribution,
    );
    const boardState = boardStateCalculator.computeLayout(this.state.currentTurn);
    const tilesLayout = boardState.tilesLayout();
    const latestTurn = boardState.latestTurn();
    const displayedComments = this.props.gameComments.filter(comment =>
      comment.turn_num === this.state.currentTurn);

    window.console.log(this.props.gameRepr);
    window.console.log(boardState);
    let player1;
    let player2;
    // FIXME: Rewrite, this is horrible, this code.
    if (this.props.gameRepr && this.props.gameRepr.players &&
      this.props.gameRepr.players[0]) {
      player1 = this.props.gameRepr.players[0].nick;
      player2 = this.props.gameRepr.players[1].nick;
    }
    let playerID = 0;
    let turnNumber = 1;
    if (boardState.turns[player1]) {
      if (!boardState.turns[player2] ||
          boardState.turns[player1].length !== boardState.turns[player2].length) {
        playerID = 1;
      }
      turnNumber = Math.min(
        boardState.turns[player1].length,
        boardState.turns[player2] ? boardState.turns[player2].length : 0,
      ) + 1; // turn number seems to be 1-based
    }

    return (
      <div className="row">

        <div className="col-lg-4 col-md-3 col-sm-5 hidden-xs">
          <div className="row">
            <div className="col-lg-12">
              <Analyzer
                playerID={playerID}
                turnNumber={turnNumber}
                gcg={this.props.gameRepr.originalGCG}
                show={this.state.showAnalyzer}
                ref={(node) => {
                  this.analyzer = node;
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h4>Notes and comments</h4>
              <Notes
                turnIdx={this.state.currentTurn}
                gcgNote={latestTurn ? latestTurn.note : ''}
                addlDescription={
                  latestTurn && latestTurn.type === MoveTypesEnum.SCORING_PLAY ?
                  `Last move: ${latestTurn.nick} played ${latestTurn.pos}
                  ${latestTurn.summary} from a rack of ${latestTurn.rack}` : ''
                }
                onSubmitComment={comment => this.onSubmitComment(comment)}
                comments={displayedComments}
                loggedInUsername={this.props.username}
                onEditComment={this.props.editComment}
                onDeleteComment={this.onDeleteComment}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-md-5 col-sm-7 col-xs-12">

          <div className="row">
            <div className="col-lg-8 col-lg-offset-3">
              <TurnsNavbar
                stepForward={this.stepForward}
                stepBackward={this.stepBackward}
                fastForward={this.fastForward}
                fastBackward={this.fastBackward}
                analyze={this.analyze}
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: 8 }}>
            <Scoreboard
              player1={boardState.players[0]}
              player2={boardState.players[1]}
              player1score={boardState.players[0] ?
                boardState.latestScore(boardState.players[0].nick) : 0}
              player2score={boardState.players[1] ?
                boardState.latestScore(boardState.players[1].nick) : 0}
              currentUser={boardState.currentUser}
              currentRack={boardState.currentRack}
              windowWidth={this.props.windowWidth}
            />
          </div>

          <div className="row">
            <div className="col-xs-12">
              <Board
                gridWidth={15}
                gridHeight={15}
                windowWidth={this.props.windowWidth}
                windowHeight={this.props.windowHeight}
                // boardWidth={465}
                // boardHeight={465}
                gridLayout={CrosswordGameSetup}
                tilesLayout={tilesLayout}
                lastPlayedLetters={boardState.lastPlayedLetters}
                showBonusLabels
              />
            </div>
          </div>

        </div>

        <div className="col-lg-3 col-md-4 hidden-sm hidden-xs">
          <Scoresheet
            player1={boardState.players[0]}
            player2={boardState.players[1]}
            turns={boardState.turns}
            comments={this.props.gameComments}
            tilesLayout={tilesLayout}
            pool={boardState.pool}
            currentRack={boardState.currentRack}
            onTurnClick={idx => () => this.onTurnClick(idx)}
          />
        </div>
        {/* The following is an extra stand-alone pool for small screens */}
        <div className="col-sm-12 col-xs-12 hidden-md hidden-lg">
          <Pool
            currentRack={boardState.currentRack}
            pool={boardState.pool}
          />
        </div>

      </div>
    );
  }
}

Viewer.propTypes = {
  gameRepr: PropTypes.shape({
    version: PropTypes.number.isRequired,
    turns: PropTypes.arrayOf(PropTypes.object).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      real_name: PropTypes.string,
      p_number: PropTypes.string,
      nick: PropTypes.string,
    })),
    originalGCG: PropTypes.string,
  }).isRequired,
  submitComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  requestComments: PropTypes.func.isRequired,
  gameID: PropTypes.string.isRequired,
  gameComments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.bool,
  })).isRequired,

  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default Viewer;

