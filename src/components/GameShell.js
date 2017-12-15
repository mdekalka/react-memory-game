import React, { Component } from 'react';
import classNames from 'classnames';

import { gameOptions, setStepsLimit, generateBoard } from './GameShellService';

import './GamShell.scss';

class GameShell extends Component {
  static MAX_COUNT = 2;
  static BOARD_ITEMS = 4;

  state = {
    board: [],
    shownCount: 0,
    openedItemKeys: [],
    allAtempts: 0,
    lockedItems: 0,
    errors: [],
    isAdvancedMenuOpen: true,
    options: gameOptions,
    startTime: new Date(),
    finishTime: null
  }

  componentDidMount() {
    this.createNewBoard();
  }

  componentWillUnMount() {
    clearTimeout(this.failedAttemptTimeout);
  }

  createNewBoard() {
    const board = generateBoard(gameOptions.size, gameOptions.items);

    if (board.error) {
      this.setState({ errors: [].concat(board.error), lockedItems: 0 });
    } else {
      this.setState({ board: board.items, lockedItems: 0 });
    }
  }

  onBoardItemClick = ({ _id, key }) => {
    if (this.state.shownCount < GameShell.MAX_COUNT) {
      this.setState(prevState => {
        return {
          board: prevState.board.map(boardItem => {
            if (boardItem._id === _id && !boardItem.open) {
              return { ...boardItem, open: !boardItem.open };
            } else {
              return boardItem;
            }
          }),
          openedItemKeys: prevState.openedItemKeys.concat(key),
          shownCount: ++prevState.shownCount
        }
      }, () => {
        if (this.state.openedItemKeys.length === GameShell.MAX_COUNT) {
          if (this.state.openedItemKeys[0] === this.state.openedItemKeys[this.state.openedItemKeys.length - 1]) {
            this.setState(prevState => {
              return {
                board: prevState.board.map(boardItem => {
                  if (boardItem.key === key) {
                    return { ...boardItem, locked: true };
                  } else {
                    return boardItem;
                  }
                }),
                openedItemKeys: [],
                shownCount: 0,
                lockedItems: prevState.lockedItems + 2,
                allAtempts: ++prevState.allAtempts
              }
            })
          } else {
            this.failedAttemptTimeout = setTimeout(() => {
              this.setState(prevState => {
                return {
                  board: prevState.board.map(boardItem => {
                    if (!boardItem.locked) {
                      return { ...boardItem, open: false };
                    } else {
                      return boardItem;
                    }
                  }),
                  openedItemKeys: [],
                  shownCount: 0,
                  allAtempts: ++prevState.allAtempts
                }
              })
            }, 1000);
          }
        }
      })
    };
  }

  onNewGame = () => {
    this.createNewBoard();
  }

  onAdvancedMenuToggle = () => {
    this.setState({ isAdvancedMenuOpen: !this.state.isAdvancedMenuOpen });
  }

  onSizeItemClick = (size) => {
    this.setState(prevState => ({options: {...prevState.options, size }}));
  }

  onStepLimitToggle = (hasLimit) => {
    this.setState(prevState => ({ options: {...prevState.options, stepsLimit: hasLimit ? setStepsLimit : null } }));
  }

  render() {
    const isGameOver = this.state.lockedItems === this.state.board.length;

    return (
      <div className={classNames('game-shell', {'game-over': isGameOver})}>
        <div className="board-container">
          <div className="board-list">
            {this.state.board.map((boardItem, index)=> (
              <div key={boardItem._id} className="board-box">
                <div className={classNames('board-item', {'open': boardItem.open, 'locked': boardItem.locked, 'success': boardItem.success})}
                    onClick={() => boardItem.open ? null : this.onBoardItemClick(boardItem)}>
                  <div className="board-preview board-preview-front">{index}</div>
                  <div className="board-preview board-preview-back">
                    <img className="board-image" src={boardItem.image} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            isGameOver &&
            <div className="board-game-over">
              <div className="game-over-title">Game Over</div>
              <button className="btn game-over-btn" onClick={this.onNewGame}>New Game</button>
            </div>
          }
        </div>
        <div className={classNames('board-menu', {'open': this.state.isAdvancedMenuOpen})}>
          <div className="board-options">
            <div className="nav-btn pointer" onClick={this.onAdvancedMenuToggle}>Advanced options: <i className="fa fa-angle-double-right" aria-hidden="true"></i></div>
            <div>All attempts: {this.state.allAtempts}</div>
            <div>Opened items: {this.state.lockedItems}</div>
          </div>
          <div className="advanced-menu">
            <div className="nav-btn pointer" onClick={this.onAdvancedMenuToggle}>
              <i className="fa fa-angle-double-left" aria-hidden="true"></i> Back
            </div>
            <div className="menu-row">
              <div className="menu-row-title">Board items count:</div>
              <div className="menu-row-content">
                <ul className="size-list">
                  <li onClick={() => this.onSizeItemClick(10)} className={classNames('size-item', {'active': 10 === this.state.options.size})}>10</li>
                  <li onClick={() => this.onSizeItemClick(12)} className={classNames('size-item', {'active': 12 === this.state.options.size})}>12</li>
                  <li onClick={() => this.onSizeItemClick(14)} className={classNames('size-item', {'active': 14 === this.state.options.size})}>14</li>
                  <li onClick={() => this.onSizeItemClick(16)} className={classNames('size-item', {'active': 16 === this.state.options.size})}>16</li>
                </ul>
              </div>
            </div>
            <div className="menu-row">
              <div className="menu-row-title">Board images:</div>
              <div className="menu-row-content">
                <ul className="image-list">
                  {this.state.options && this.state.options.items.map(imageItem => (
                    <li className="image-item pointer" key={imageItem.key}>
                      {/* {imageItem.selected} */}
                      <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                      <img className="image-picture" src={imageItem.image} alt="" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="menu-row">
              <div className="menu-row-title">Steps to end:</div>
              <div className="menu-row-content">
                <button onClick={() => this.onStepLimitToggle(true)}>On</button>
                <button onClick={() => this.onStepLimitToggle()}>Off</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default GameShell;