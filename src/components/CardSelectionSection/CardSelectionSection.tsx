import { useEffect, useState } from 'react';
import cx from 'classnames';

import Message from '../Message/Message';

import './CardSelectionSection.scss';


const insufficientCardsSelected = (cards: CardItem[], boardSize: number) => {
  const selectedCards = cards.filter(({ selected }) => !!selected);

  return Math.max(0, boardSize / 2 - selectedCards.length);
}

interface CardSelectionSectionProps {
  options: GameConfig
  onOptionsUpdate: (newOptions: Partial<GameConfig>) => void
  onError?: (error?: boolean) => void
}

const CardSelectionSection = ({ options, onOptionsUpdate, onError }: CardSelectionSectionProps) => {
  const [ insufficientCardCount, setInsufficientCardCount ] = useState(0);
  const { cardItems, boardSize } = options;

  useEffect(() => {
    const selectedCards = cardItems.filter(({ selected }) => !!selected);
    const insufficientCardCount = insufficientCardsSelected(selectedCards, boardSize);

    setInsufficientCardCount(insufficientCardCount);
    
    if (insufficientCardCount > 0) {
      let cardsToSelect = boardSize / 2;
      const filledCardItems = cardItems.map(card => ({ ...card, selected: !!(cardsToSelect-- > 0) }));

      onError?.(false);
      setInsufficientCardCount(0);
      onOptionsUpdate({ cardItems: filledCardItems });
    } else {
      setInsufficientCardCount(insufficientCardCount);
    }

  }, [boardSize, onOptionsUpdate]);

  const toggleCard = (selectedCard: CardItem) => {
    const { name } = selectedCard;

    const updatedCardItems = cardItems.map(card => card.name === name ? { ...card, selected: !card.selected } : card );
    const insufficientCardCount = insufficientCardsSelected(updatedCardItems, boardSize);

    setInsufficientCardCount(insufficientCardCount);
    onError?.(!!insufficientCardCount);
    // Even if there is an error, we're not blocking updating cards by user.
    // User will be forced to pick correct amount of cards before proceed anyway.
    onOptionsUpdate({ cardItems: updatedCardItems });
  }

  return (
    <div className="card-selection">
      <div className="section-description">Selected cards will be randomly reflected on your board.</div>
      <ul className="card-list">
        {cardItems.map(card => (
          <li
            key={card.name}
            onClick={() => toggleCard(card)}
            className={cx('card pointer', { selected: card.selected})} >
            <i className="fa fa-check-circle-o" aria-hidden="true"></i>
            <img className="card-image" src={card.imagePath} alt="card preview" />
          </li>
        ))}
      </ul>
      {!!insufficientCardCount &&
        <Message type="error">You should choose at least {insufficientCardCount} card(s) for this board size.</Message>}
    </div>
  )
}

export default CardSelectionSection;
