import React, { Component } from 'react';

import { gameItems, generateBoard } from './GameShellService';

import './GamShell.scss';

class GameShell extends Component {
  static MAX_COUNT = 2;

  state = {
    board: generateBoard(null, gameItems),
    shownCount: 0,
    openedItemKeys: []
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
                shownCount: 0
              }
            })
          } else {
            setTimeout(() => {
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
                  shownCount: 0
                }
              })
            }, 1000)
          }
        }
      })
    };
  }

  render() {
    return (
      <div className="game-shell">
        <div className="board-container">
          {this.state.board.map((boardItem, index)=> (
            <div key={boardItem._id} className="board-box">
              <div className={`board-item ${boardItem.open ? 'open' : ''}`}
                   onClick={() => boardItem.open ? null : this.onBoardItemClick(boardItem)}>
                <div className="board-preview board-preview-front">{index}</div>
                <div className="board-preview board-preview-back">
                  <img className="board-image" src={boardItem.image} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

export default GameShell;