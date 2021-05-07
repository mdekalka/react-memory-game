import { memo } from 'react';
import { splitToChunks } from '../../../utils/array';

import BoardCell from '../BoardCell/BoardCell';

import './BoardGrid.scss';


interface BoardGridProps {
  board: Board
  rows: number
  onCellClick: (cell: Cell) => void
}

const BoardGrid = ({ board, rows, onCellClick }: BoardGridProps) => {
  const boardRows = splitToChunks(board, rows);

  return (
    <div className="board-grid">
      {boardRows.map((row, index) => (
        <div className="board-row" key={index}>
          {row.map(cell => (
            <BoardCell key={cell.id} cell={cell} onCellClick={onCellClick} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default memo(BoardGrid);
