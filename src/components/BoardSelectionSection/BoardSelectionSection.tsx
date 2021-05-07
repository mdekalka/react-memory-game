import cx from 'classnames';

import { BOARD_SIZES } from '../../constants/constants';

import './BoardSelectionSection.scss';


interface BoardSelectionSectionProps {
  options: GameConfig
  onOptionsUpdate: (newOptions: Partial<GameConfig>) => void
}

const BoardSelectionSection = ({ options, onOptionsUpdate }: BoardSelectionSectionProps) => {
  const { boardSize } = options;
  const sizes = Object.entries(BOARD_SIZES);

  return (
    <ul className="board-selection">
      {sizes.map(([ sizeName, sizeList ]) => (
        <li className={`size-row ${sizeName}`} key={sizeName}>
          <div className="size-title" >{sizeName} board:</div>
          {sizeList.map(({ cells, rows }) => (
            <div
              key={cells}
              onClick={() => onOptionsUpdate({ boardSize: cells, boardRows: rows })}
              className={cx('size-item pointer', { active: cells === boardSize })}>
              {cells}
            </div>
          ))} 
        </li>
      ))}
    </ul>
  )
}

export default BoardSelectionSection;
