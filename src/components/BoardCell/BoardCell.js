import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BoardCell.scss';

class BoardCell extends Component {
  static propTypes = {
    index: PropTypes.number,
    cell: PropTypes.object,
    onBoardItemClick: PropTypes.func
  }

  static defaultProps = {
    index: null,
    cell: {},
    onBoardItemClick: () => {}
  }

  render() {
    const { cell, index } = this.props;

    return (
      <div
        key={cell._id}
        className={`board-box ${cell.open ? 'open' : ''} ${cell.locked ? 'locked' : ''}`}
        onClick={() => cell.open ? null : this.props.onBoardItemClick(cell)}>
          <div className="board-preview board-preview-front">{index + 1}</div>
          <div className="board-preview board-preview-back">
            <img className="board-image" src={cell.image} alt="board cell" />
          </div>
      </div>
    )
  }
}

export default BoardCell;
