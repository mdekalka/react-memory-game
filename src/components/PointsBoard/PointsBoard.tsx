import './PointsBoard.scss';


interface PointsBoardProps {
  attempts: number
  options: GameConfig
  guessedCount: number
}

const PointsBoard = ({ attempts, options, guessedCount }: PointsBoardProps) => {
  const { stepsLimit, randomizeCells } = options;
  const restCells = options.boardSize - guessedCount;

  return (
    <div className="points-board">
      <p className="board-row">Attempts: {attempts}</p>
      <p className="board-row">Cells left: {restCells}</p>
      {!!stepsLimit &&
        <p className="board-row">
          Steps limit: <span className="highlight">{stepsLimit - attempts}</span> attempt(s) left
        </p>}
      {randomizeCells &&
        <p className="board-row">Randomize cells: <span className="highlight">on</span></p>}
    </div>
  )
}

export default PointsBoard;
