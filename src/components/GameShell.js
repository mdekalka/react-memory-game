import React, { Component } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'react-tippy';

import {
  BOARD_AVAILABLE_SIZES,
  gameOptions,
  generateBoard,
  setStepsLimit,
  defineSelectedItems,
  validateImageCount,
  validateOptions } from './GameShellService';
import GameMenu from './GameMenu/GameMenu';

import './GamShell.scss';

class GameShell extends Component {
  static MAX_COUNT = 2;
  static BOARD_ITEMS = 4;
  static ANIMATION_TIMEOUT = 1000;

  state = {
    board: [],
    keys: [],
    shownCount: 0,
    openedItemKeys: [],
    allAtempts: 0,
    lockedItems: 0,
    errors: [],
    validationsErrors: {},
    isAdvancedMenuOpen: true,
    options: gameOptions
  }

  componentDidMount() {
    this.createNewBoard(this.state.options.size, this.state.keys);
  }

  componentWillUnMount() {
    clearTimeout(this.failedAttemptTimeout);
  }

  createNewBoard(size, chosenItems) {
    const board = generateBoard(size, chosenItems);
    const { options } = this.state;

    if (board.error) {
      this.setState({ errors: [].concat(board.error), lockedItems: 0 });
    } else {
      this.setState({
        board: board.items,
        keys: board.uniqueKeys,
        lockedItems: 0
      });
    }
  }

  resetCurrentBoard() {
    this.setState(prevState => {
      return {
        board: prevState.board.map(item => ({ _id: item._id, key: item.key, image: item.image })),
        shownCount: 0,
        openedItemKeys: [],
        allAtempts: 0,
        lockedItems: 0,
      }
    })
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
            }, GameShell.ANIMATION_TIMEOUT);
          }
        }
      })
    };
  }

  onNewGame = () => {
    this.createNewBoard(this.state.options.size, this.state.keys);
  }

  onAdvancedMenuToggle = () => {
    const { isAdvancedMenuOpen } = this.state;

    if (!isAdvancedMenuOpen) {
      this.resetCurrentBoard();
    }

    this.setState({ isAdvancedMenuOpen: !this.state.isAdvancedMenuOpen });
    this.createNewBoard(this.state.options.size, this.state.keys);
  }

  onSizeItemClick = (size) => {
    this.createNewBoard(size, this.state.keys);
    this.setState(prevState => ({
      validationsErrors: {},
      options: {
        ...prevState.options,
        stepsLimit: prevState.options.stepsLimit ? setStepsLimit(size) : prevState.options.stepsLimit,
        size
      }
    }));
  }

  onStepLimitToggle = () => {
    this.setState(prevState => ({ options: {
      ...prevState.options,
      stepsLimit: prevState.options.stepsLimit ? null : setStepsLimit(prevState.options.size) }
    }));
  }

  onImageSelect = (imageItem) => {
    const { keys, options, validationsErrors } = this.state;
    let invalidImageCount;
    let updatedKeys;

    if (keys.includes(imageItem.key)) {
      invalidImageCount = validateImageCount(keys.length - 1, options.size);
      updatedKeys = keys.filter(key => key !== imageItem.key);
    } else {
      invalidImageCount = validateImageCount(keys.length + 1, options.size);
      updatedKeys = keys.concat(imageItem.key);
    }

    this.setState({ validationsErrors: { ...validationsErrors, invalidImageCount }, keys: updatedKeys });
  }

  isOptionsInvalid = () => {
    return !!Object.values(this.state.validationsErrors).filter(item => item).length;
  }

  isGameOver() {
    return this.state.board.length > 0 && this.state.lockedItems === this.state.board.length;
  }

  render() {
    const isGameOver = this.isGameOver();
    const predefinedItems = defineSelectedItems(this.state.keys);

    return (
      <div className={classNames('game-shell', {'game-over': isGameOver})}>
        <div className="board-container">
          <div className="board-list">
            {this.state.board.map((boardItem, index)=> (
              <div key={boardItem._id} className="board-box">
                <div className={classNames('board-item', {'open': boardItem.open, 'locked': boardItem.locked, 'success': boardItem.success})}
                    onClick={() => boardItem.open ? null : this.onBoardItemClick(boardItem)}>
                  <div className="board-preview board-preview-front">{index + 1}</div>
                  <div className="board-preview board-preview-back">
                    <img className="board-image" src={boardItem.image} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            !!this.state.errors.length &&
            <div className="error-list">
              {this.state.errors.map((error, index) => (
                <div className="error-item" key={index}>{error}</div>
              ))}
            </div>
          }
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
            <div className="menu-row-title nav-btn pointer" onClick={this.onAdvancedMenuToggle}>Advanced options: <i className="fa fa-angle-double-right" aria-hidden="true"></i></div>
            <div>All attempts: {this.state.allAtempts}</div>
            <div>Opened items: {this.state.lockedItems}</div>
          </div>
          <GameMenu onMenuToggle={this.onAdvancedMenuToggle} onImageSelect={this.onImageSelect} onSizeItemClick={this.onSizeItemClick}
            onStepLimitToggle={this.onStepLimitToggle} items={predefinedItems} options={this.state.options}
            errors={this.state.validationsErrors} isOptionsInvalid={this.isOptionsInvalid} />
        </div>
      </div>
    )
  }
};

export default GameShell;