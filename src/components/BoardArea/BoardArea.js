import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoardCell from '../BoardCell/BoardCell';

import './BoardArea.scss';

class BoardArea extends Component {
  static propTypes = {
    board: PropTypes.array,
    onBoardItemClick: PropTypes.func
  }

  static defaultProps = {
    board: [],
    onBoardItemClick: () => {}
  }

  render() {
    return (
      <div className="board-container">
        {this.props.board.map((boardItem, index)=> (
          <BoardCell key={index} cell={boardItem} index={index} onBoardItemClick={this.props.onBoardItemClick} />
        ))}
      </div>
    )
  }
}

export default BoardArea;
