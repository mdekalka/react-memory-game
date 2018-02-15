import React, { Component } from 'react';

import {
  BOARD_SIZES,
  gameOptions,
  generateBoard,
  setStepsLimit,
  isImageCountValid,
  partialShaffle,
  defineSelectedImages } from './GameShellService';

import GameMenu from '../GameMenu/GameMenu';
import BoardArea from '../BoardArea/BoardArea';
import GameOver from '../GameOver/GameOver';

import './GameShell.scss';

class GameShell extends Component {
  static MAX_COUNT = 2;
  static ANIMATION_TIMEOUT = 1000;

  state = {
    board: [],
    cardKeys: [],
    openedItemKeys: [],
    allAtempts: 0,
    lockedItems: 0,
    boardError: '',
    validationsErrors: {},
    isAdvancedMenuOpen: false,
    options: gameOptions
  }

  exludeKeys = ['locked', 'open'];

  componentDidMount() {
    this.createBoard(this.state.options.size, this.state.cardKeys);
  }

  componentWillUnMount() {
    clearTimeout(this.failedAttemptTimeout);
  }

  createBoard(size, chosenItems) {
    const board = generateBoard(size, chosenItems);

    if (board.error) {
      this.setState({ boardError: board.error });
    } else {
      this.setState({
        board: board.items,
        cardKeys: board.uniqueKeys
      });

      this.resetBoardCounts();
    }
  }

  resetBoardCounts() {
    this.setState({
      allAtempts: 0,
      lockedItems: 0,
      openedItemKeys: []
    })
  }

  setBoardWithOpenState(board, openedId) {
    return board.map(boardItem => {
      if (boardItem._id === openedId && !boardItem.open) {
        return { ...boardItem, open: !boardItem.open };
      } else {
        return boardItem;
      }
    });
  }

  setBoardWithLockedState(board, lockedKey) {
    return board.map(boardItem => {
      if (boardItem.key === lockedKey) {
        return { ...boardItem, locked: true };
      } else {
        return boardItem;
      }
    })
  }

  setBoardWithCloseState(board) {
    return board.map(boardItem => {
      if (!boardItem.locked) {
        return { ...boardItem, open: false };
      } else {
        return boardItem;
      }
    })
  }

  setBoardWithRandomize(board, excludeKeys) {
    return this.state.options.randomizeCells ? partialShaffle(board, excludeKeys) : board;
  }

  onBoardItemClick = ({ _id, key }) => {
    // TODO: refactor this to more readable format

    // Set chosen card to [open] state
    if (this.state.openedItemKeys.length < GameShell.MAX_COUNT) {
      this.setState(({ board, openedItemKeys }) => ({
          board: this.setBoardWithOpenState(board, _id),
          openedItemKeys: [ ...openedItemKeys, key]
      }), () => {
        const { openedItemKeys } = this.state;

        // Two cards are opened:
        if (openedItemKeys.length === GameShell.MAX_COUNT) {
          // If two card equals - lock them and increase attempts by 1
          if (openedItemKeys[0] === openedItemKeys[openedItemKeys.length - 1]) {
            this.setState(prevState => {
              return {
                board: this.setBoardWithLockedState(prevState.board, key),
                openedItemKeys: [],
                lockedItems: prevState.lockedItems + GameShell.MAX_COUNT,
                allAtempts: ++prevState.allAtempts
              }
            })
            // set update state in next cycle, even it would be batched
            this.setState(({ board }) => ({
              board: this.setBoardWithRandomize(board, this.exludeKeys)
            }));
          } else {
            // If two cards are not equals - remove [open] state from them and clear opened items/attempts counts
            this.failedAttemptTimeout = setTimeout(() => {
              this.setState(({ board, allAtempts }) => ({
                board: this.setBoardWithCloseState(board),
                openedItemKeys: [],
                allAtempts: ++allAtempts
              }));

              this.setState(({ board }) => ({
                board: this.setBoardWithRandomize(board, this.exludeKeys)
              }));
            }, GameShell.ANIMATION_TIMEOUT);
          }
        }
      })
    };
  }

  onNewGame = () => {
    this.createBoard(this.state.options.size, this.state.cardKeys);
  }

  onAdvancedMenuToggle = () => {
    const hasErrors = this.hasValidationErrors();

    if (!hasErrors) {
      this.setState(({ isAdvancedMenuOpen }) => ({
        isAdvancedMenuOpen: !isAdvancedMenuOpen
      }))
    }
  }

  onSizeItemClick = (size) => {
    this.createBoard(size, this.state.cardKeys);

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

    this.createBoard(this.state.options.size, this.state.cardKeys);
  }

  onRandomizeCellsToggle = () => {
    this.setState(({ options }) => ({
      options: {
        ...options,
        randomizeCells: !options.randomizeCells
      }
    }));

    this.createBoard(this.state.options.size, this.state.cardKeys);
  }

  onImageSelect = (imageItem) => {
    const { cardKeys, options } = this.state;
    let invalidImageCount;
    let updatedCardKeys;

    if (cardKeys.includes(imageItem.key)) {
      updatedCardKeys = cardKeys.filter(key => key !== imageItem.key)
    } else {
      updatedCardKeys = cardKeys.concat(imageItem.key);
    }

    invalidImageCount = !isImageCountValid(updatedCardKeys, options.size);

    this.setState(({ cardKeys, validationsErrors }) => ({
      cardKeys: updatedCardKeys,
      validationsErrors: { ...validationsErrors, invalidImageCount }
    }));
  }

  hasValidationErrors = () => {
    return !!Object.values(this.state.validationsErrors).filter(item => item).length;
  }

  isGameOver() {
    const { board, options, lockedItems, allAtempts } = this.state;
    const isAllOpened = board.length > 0 && lockedItems === board.length;

    if (options.stepsLimit) {
      const isLoseByStepsLimit = (options.stepsLimit - allAtempts <= 0);

      return isLoseByStepsLimit ? { lose: true, end: isLoseByStepsLimit } : { end: isAllOpened }
    }

    return { end: isAllOpened }
  }

  defineSelectedKeys() {
    const { cardKeys } = this.state;

    return this.state.board.map(item => {
      if (cardKeys.includes(item.key)) {
        return {...item, selected: true };
      } else {
        return item;
      }
    });
  }

  render() {
    const { options, allAtempts, lockedItems, cardKeys } = this.state;
    const isGameOver = this.isGameOver();
    const cardItems = defineSelectedImages(cardKeys);
    const restCards = options.size - lockedItems;

    return (
      <div className={`game-shell ${isGameOver ? 'game-over' : ''}`}>
        {
          this.state.boardError
          ? <div className="error-message">{this.state.boardError}</div>
          : <BoardArea board={this.state.board} onBoardItemClick={this.onBoardItemClick} />
        }
        {
          isGameOver.end && <GameOver status={isGameOver} onNewGame={this.onNewGame} />
        }
        <div className="board-menu">
          <div className="menu-row-title nav-btn pointer" onClick={this.onAdvancedMenuToggle}>
            Advanced options:
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
          </div>
          <div className="board-information">
            <div className="board-row">Attempts: {allAtempts}</div>
            <div className="board-row">Cards left: {restCards}</div>
            {
              !!options.stepsLimit &&
              <div className="board-row">
                Steps limit: <span className="highlight">{options.stepsLimit - allAtempts}</span> attempt(s) left
              </div>
            }
            {
              options.randomizeCells &&
              <div className="board-row">Randomize cells: <span className="highlight">on</span></div>
            }
          </div>
          <GameMenu
            onMenuToggle={this.onAdvancedMenuToggle}
            onImageSelect={this.onImageSelect}
            onSizeItemClick={this.onSizeItemClick}
            onStepLimitToggle={this.onStepLimitToggle}
            onRandomizeCellsToggle={this.onRandomizeCellsToggle}
            items={cardItems}
            cardKeys={cardKeys}
            isOpen={this.state.isAdvancedMenuOpen}
            open={this.props.isAdvancedMenuOpen}
            boardSizes={BOARD_SIZES}
            options={options}
            errors={this.state.validationsErrors} />
        </div>
      </div>
    )
  }
};

export default GameShell;