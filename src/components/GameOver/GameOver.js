import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './GameOver.scss';

class GameOver extends Component {
  static propTypes = {
    status: PropTypes.object,
    onNewGame: PropTypes.func
  }

  static defaultProps = {
    status: {},
    onNewGame: () => {}
  }

  render() {
    const { status } = this.props;

    return (
      <div className="board-game-over">
        <div className="game-over-container">
          <div className="game-over-result">You <span className={`${status.lose ? 'error' : 'success'}-message`}>[{status.lose ? 'lost' : 'won'}]</span> the game.</div>
          <div>[Insert gif here]</div>
          <button className="btn game-over-btn" onClick={this.props.onNewGame}>New Game</button>
        </div>
      </div>
    )
  }
}

export default GameOver;