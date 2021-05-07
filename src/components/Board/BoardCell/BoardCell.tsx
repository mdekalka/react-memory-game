import cx from 'classnames';

import './BoardCell.scss';


interface BoardCellProps {
  cell?: Cell,
  onCellClick: (cell: Cell) => void
}

const BoardCell = ({ cell, onCellClick }: BoardCellProps) => {
  if (!cell) return null;

  return (
    <div
      key={cell.id}
      className={cx('board-cell', { opened: cell.opened, guessed: cell.guessed })}
      onClick={() => cell.opened ? null : onCellClick(cell)}>
        <div className="cell-preview cell-preview-front" />
        <div className="cell-preview cell-preview-back">
          <img className="cell-image" src={cell.imagePath} alt={cell.name} />
        </div>
    </div>
  )
}

export default BoardCell;
