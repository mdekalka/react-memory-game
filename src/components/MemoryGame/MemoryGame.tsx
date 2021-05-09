import { useState, useEffect, useCallback } from 'react';

import {
    generateBoard,
    areAllCellsOpened,
    setGuessedCells,
    setOpenedLastCells,
    setOpenedCells,
    setClosedCells
} from '../../utils/boardUtils';
import { MAX_CARD_OPEN_COUNT, CARD_FLIP_ANIMATION_DELAY } from '../../constants/constants';
import { GAME_CONFIG } from '../../config/config';

import BoardGrid from '../Board/BoardGrid/BoardGrid';
import Message from '../Message/Message';
import PointsBoard from '../PointsBoard/PointsBoard';
import GameOver from '../GameOver/GameOver';
import PlayListMenu from '../PlayListMenu/PlayListMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';

import './MemoryGame.scss';


const MemoryGame = () => {
  const [ board, setBoard ] = useState<Board>([]);
  const [ cellsToCompare, setCellsToCompare ] = useState<BoardCell[]>([]);
  const [ boardError, setboardError ] = useState(null);
  const [ attempts, setAttempts ] = useState(0);
  const [ guessedCount, setGuessedCount ] = useState(0);
  const [ options, setOptions ] = useState(GAME_CONFIG);

  const createBoard = useCallback(() => {
    resetGameOptions();

    try {
      const board = generateBoard(options.boardSize, options.cardItems);

      setBoard(board);
    } catch(error) {
      setboardError(error.message);
    }
  }, [options])

  useEffect(() => {
    createBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    createBoard();
  }, [options.boardSize, createBoard]);

  useEffect(() => {
    if (!cellsToCompare.length) return;

    if (cellsToCompare.length === MAX_CARD_OPEN_COUNT) {
      const firstOpenedCard = cellsToCompare[0];
      const lastOpenedCard = cellsToCompare[cellsToCompare.length - 1];

      setAttempts(attempts => attempts + 1);

      if (firstOpenedCard.name === lastOpenedCard.name) {
        setCellsToCompare([]);
        setGuessedCount(count => count + MAX_CARD_OPEN_COUNT);
        setBoard(board => setGuessedCells(board, firstOpenedCard.name));
      } else {
        // Using timeout here, since we want to show opened state for a sec and close after.
        setTimeout(() => {
          setCellsToCompare([]);
          setBoard(board => setClosedCells(board));
        }, CARD_FLIP_ANIMATION_DELAY);
      }
    }
  }, [cellsToCompare]);

  useEffect(() => {
    const lastCardsPair = (board.length - guessedCount) === MAX_CARD_OPEN_COUNT;

    // If only two last items left - just open them and finish the game.
    if (lastCardsPair) {
      setBoard(board => setOpenedLastCells(board));
      setGuessedCount(board.length);
    }
  }, [board.length, guessedCount]);

  const onOptionsUpdate = useCallback((newOptions: Partial<GameConfig>) => {
    setOptions(options => ({ ...options, ...newOptions }));
  }, [])

  const resetGameOptions = () => {
    setAttempts(0);
    setGuessedCount(0);
  }

  const isGameOver = () => {
    const allCellsOpened = areAllCellsOpened(board.length, guessedCount);

    if (options.stepsLimit) {
      const isLoseByStepsLimit = options.stepsLimit - attempts <= 0;

      return isLoseByStepsLimit ? { gameOver: true, winner: false } : { gameOver: allCellsOpened, winner: true};
    }

    return { gameOver: allCellsOpened, winner: allCellsOpened };
  }

  const onCellClick = useCallback(cell => {
    if (cellsToCompare.length < MAX_CARD_OPEN_COUNT) {

      setCellsToCompare(cells => [...cells, cell]);
      setBoard(board => setOpenedCells(board, cell.id))
    }
  }, [cellsToCompare.length])

  const gameState = isGameOver();

  return (
    <div className="game-container">
      {gameState.gameOver && <GameOver winner={gameState.winner} onNewGame={createBoard} />}
      <h5 className="game-header">React memory game</h5>
      
      <PointsBoard attempts={attempts} guessedCount={guessedCount} options={options} />

      {boardError
        ? <Message type="error">{boardError}</Message>
        : <BoardGrid board={board} rows={options.boardRows} onCellClick={onCellClick} />}

      <SettingsMenu options={options} onOptionsUpdate={onOptionsUpdate} />
      <PlayListMenu />
    </div>
  )
};

export default MemoryGame;
