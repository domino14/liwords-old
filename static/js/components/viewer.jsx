import React from 'react';
import PropTypes from 'prop-types';

import Board from './board';
import Scoreboard from './scoreboard';
import Pool from './pool';
import Scoresheet from './scoresheet';
import Notes from './notes';
import TurnsNavbar from './turns_navbar';
import { MoveTypesEnum } from '../constants/moves';
import Analyzer from './analyzer';

import { CrosswordGameSetup } from '../constants/board_setups';

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnalyzer: false,
    };

    this.analyze = this.analyze.bind(this);
    this.onTurnClick = this.onTurnClick.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
  }


  componentDidMount() {
    // The viewer should request all comments on mount, if there is a game ID.
    if (!this.props.gameID) {
      return;
    }
    this.props.requestComments(this.props.gameID);
    // Change URL to match (or reconcile)
    this.props.gameViewerSeek(this.props.initialTurnID - 1, this.props.gameID);
  }

  onTurnClick(idx) {
    this.props.gameViewerSeek(idx - 1, this.props.gameID);
  }

  onSubmitComment(comment) {
    this.props.submitComment(comment, this.currentTurn);
  }

  onDeleteComment(uuid) {
    console.log('Want to delete comment iwth uuid', uuid);
    this.props.deleteComment(uuid);
  }

  analyze() {
    this.analyzer.setup();
    this.setState({
      showAnalyzer: true,
    });
  }

  render() {
    const displayedComments = this.props.gameComments.filter(comment =>
      comment.turn_num === this.props.game.moveIndex);

    window.console.log('viwer props are', this.props);

    const { latestTurn } = this.props.game;
    return (
      <div className="row">

        <div className="col-lg-4 col-md-3 col-sm-5 hidden-xs">
          <div className="row">
            <div className="col-lg-12">
              <Analyzer
                playerID={this.props.game.quacklePlayerID}
                turnNumber={this.props.game.quackleTurnNumber}
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
                seek={this.props.gameViewerSeek}
                gameId={this.props.routeMatch.params.gameId}
                analyze={this.analyze}
                turnIdx={this.props.game.moveIndex}
                maxTurnIdx={this.props.game.turns.length - 1}
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: 8 }}>
            <Scoreboard
              players={this.props.game.players}
              scores={this.props.game.scores}
              currentUser={this.props.game.currentUser}
              currentRack={this.props.game.currentRack}
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
                tilesLayout={this.props.game.tilesLayout}
                lastPlayedLetters={this.props.game.lastPlayedLetters}
                showBonusLabels
              />
            </div>
          </div>

        </div>

        <div className="col-lg-3 col-md-4 hidden-sm hidden-xs">
          <Scoresheet
            players={this.props.game.players}
            turns={this.props.game.perPlayerTurns}
            comments={this.props.gameComments}
            tilesLayout={this.props.game.tilesLayout}
            pool={this.props.game.pool}
            currentRack={this.props.game.currentRack}
            onTurnClick={idx => () => this.onTurnClick(idx)}
          />
        </div>
        {/* The following is an extra stand-alone pool for small screens */}
        <div className="col-sm-12 col-xs-12 hidden-md hidden-lg">
          <Pool
            currentRack={this.props.game.currentRack}
            pool={this.props.game.pool}
          />
        </div>

      </div>
    );
  }
}

Viewer.defaultProps = {
  gameComments: [],
};

Viewer.propTypes = {
  game: PropTypes.shape({
    currentRack: PropTypes.string,
    currentUser: PropTypes.string,
    lastPlayedLetters: PropTypes.object,
    moveIndex: PropTypes.number,
    perPlayerTurns: PropTypes.object,
    players: PropTypes.array,
    pool: PropTypes.object,
    scores: PropTypes.object,
    tilesLayout: PropTypes.arrayOf(PropTypes.string),
    turns: PropTypes.array,
    version: PropTypes.number,
    latestTurn: PropTypes.object,
    quacklePlayerID: PropTypes.number,
    quackleTurnNumber: PropTypes.number,
  }).isRequired,
  submitComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  requestComments: PropTypes.func.isRequired,
  gameID: PropTypes.string.isRequired,
  initialTurnID: PropTypes.number.isRequired,

  gameComments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.bool,
  })),

  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,

  gameViewerSeek: PropTypes.func.isRequired,

  routeMatch: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.boolean,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Viewer;

