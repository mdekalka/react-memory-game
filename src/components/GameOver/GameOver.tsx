import './GameOver.scss';


interface GameOverProps {
  onNewGame: () => void
  winner: boolean
}

const GameOver = ({ winner, onNewGame }: GameOverProps) => {
  return (
    <div className="game-over">
      <div className="game-over-">
        <p>You {winner ? 'won' : 'lost'} the game.</p>
        <button className="btn game-over-btn" onClick={onNewGame}>New Game</button>
      </div>
    </div>
  )
}

export default GameOver;
