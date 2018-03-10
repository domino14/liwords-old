/**
 * @fileOverview A modal that shows a list of games currently existing
 * in the crossword games database.
 */
import React from 'react';
import PropTypes from 'prop-types';

import ModalSkeleton from './modal/modal_skeleton';

const ListGamesTable = (props) => (
  <div />
);


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
              <table className="table">
                <thead>
                  <th>Game</th>
                  <th>Player 1</th>
                  <th>Player 2</th>
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
            <nav>
              <ul className="pager">
                <li><a href="#">Previous</a></li>
                <li><a href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        </div>

      </ModalSkeleton>
    )
  }
}

ListGamesModal.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    player1: PropTypes.string,
    player2: PropTypes.string,
    creator: PropTypes.string,
    uuid: PropTypes.string,
  })).isRequired,
};

export default ListGamesModal;
