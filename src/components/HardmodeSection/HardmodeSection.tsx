import { useEffect } from 'react';
import Toggle from 'react-toggle';
import cx from 'classnames';

import './HardmodeSection.scss';


const calculateStepsLimit = (boardSize: number) => {
  const successLimit = boardSize / 2;
  const LIMIT_RATIO = 1.74; // kinda random ratio, no hard science included.

  return successLimit + Math.floor(successLimit / LIMIT_RATIO);
};

interface HardmodeSectionProps {
  options: GameConfig
  onOptionsUpdate: (newOptions: Partial<GameConfig>) => void
}

const HardmodeSection = ({ options, onOptionsUpdate }: HardmodeSectionProps) => {
  const { stepsLimit, boardSize } = options;
  const limit = calculateStepsLimit(boardSize);

  useEffect(() => {
    if (stepsLimit) {
      const limit = calculateStepsLimit(boardSize);
  
      onOptionsUpdate({ stepsLimit: limit });
    }

  }, [boardSize, onOptionsUpdate, stepsLimit]);

  const setStepsLimit = () => {
    onOptionsUpdate({ stepsLimit: stepsLimit ? 0 : limit });
  }

  return (
    <div className="hardmode-section">
      <div className="section-row">
        <label className="toggle-label pointer">
          <Toggle defaultChecked={!!stepsLimit} onChange={setStepsLimit} />
          <span className={cx('label-header', { active: stepsLimit })}>Limited steps</span>
        </label>
        <p className="section-description">
          If this option is enabled - you will have limited steps to finish the game.
        </p>
        {!!options.stepsLimit &&
          <p className="section-description">You have only <span className="highlight">{limit}</span> attempts to finish the game</p>}
      </div>
      {/* TODO: future feature */}
      {/* <div className="section-row">
        <label className="toggle-label pointer">
          <Toggle defaultChecked={randomizeCells} onChange={() => onOptionsUpdate({ randomizeCells: !randomizeCells })} />
          <span className={cx('label-header', { active: randomizeCells })}>Randomize cells</span>
        </label>
        <p className="section-description">If this option is enabled - all hidden cells will be randomize position after each failed attempt.</p>
        {!!randomizeCells && <p className="section-description"><span className="highlight">Are you sure?</span></p>}
      </div> */}
    </div>
  )
}

export default HardmodeSection;
