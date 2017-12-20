import React from 'react';
import PropTypes from 'prop-types';

class TurnsNavbar extends React.Component {
  render() {
    const beginningTurn = (
      <li key="turnstart">
        <a href="#">{0}</a>
      </li>
    );
    /*
          // <li className="active">
          //   <a href="#">1
          //     <span className="sr-only">(current)</span>
          //   </a>
          // </li>
     */
    const turns = this.props.gameRepr.turns.map((turn, idx) => (
      <li key={`turn${idx + 1}`}>
        <a href="#">{idx + 1}</a>
      </li>));
    turns.unshift(beginningTurn);

    return (
      <nav ariaLabel="Turns">
        <ul className="pagination">
          <li>
            <a href="#" ariaLabel="Previous">
              <span ariaHidden="true">&laquo;</span>
            </a>
          </li>
          {turns}
          <li>
            <a href="#" ariaLabel="Next">
              <span ariaHidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

TurnsNavbar.propTypes = {
  gameRepr: PropTypes.shape({
    players: PropTypes.array,
    turns: PropTypes.array,
  }).isRequired,
};

export default TurnsNavbar;
