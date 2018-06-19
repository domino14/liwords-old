/* eslint-disable jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions,
  jsx-a11y/anchor-is-valid */
/**
 * @fileOverview A modal that shows a list of games currently existing
 * in the crossword games database.
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalSkeleton from './modal_skeleton';

const ListGamesRow = props => (
  <tr>
    <td>
      {moment(props.date).fromNow()}
    </td>
    <td>
      <a href={`/crosswords/games/${props.uuid}`}>View Game</a>
    </td>
    <td>
      {props.user1}
    </td>
    <td>
      {props.user2}
    </td>
  </tr>
);

ListGamesRow.propTypes = {
  date: PropTypes.string.isRequired,
  user1: PropTypes.string.isRequired,
  user2: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};


const ListGamesTable = props => (
  props.games.map((game, i) => (
    <ListGamesRow
      key={`gamerow${i + 0}`}
      user1={game.user1}
      user2={game.user2}
      uuid={game.uuid}
      date={game.date}
    />
  ))
);

ListGamesTable.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    user1: PropTypes.string,
    user2: PropTypes.string,
    uuid: PropTypes.string,
  })).isRequired,
};

class ListGamesModal extends React.Component {
  show() {
    this.modal.show();
  }

  render() {
    return (
      <ModalSkeleton
        title="List Games"
        modalClass="list-games-modal"
        size=""
        ref={(el) => {
          this.modal = el;
        }}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Game</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                  </tr>
                </thead>
                <tbody>
                  <ListGamesTable
                    games={this.props.games}
                  />
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <nav>
                <ul className="pager">
                  <li
                    className={`previous ${!this.props.hasPrevious ? 'disabled' : ''}`}
                  >
                    <a
                      onClick={this.props.fetchPrevious}
                    ><span aria-hidden="true">&larr;</span> Older
                    </a>
                  </li>
                  <li
                    className={`next ${!this.props.hasNext ? 'disabled' : ''}`}
                  >
                    <a
                      onClick={this.props.fetchNext}
                    >Newer <span aria-hidden="true">&rarr;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

      </ModalSkeleton>
    );
  }
}

ListGamesModal.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    user1: PropTypes.string,
    user2: PropTypes.string,
    uuid: PropTypes.string,
  })).isRequired,
  fetchPrevious: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default ListGamesModal;
