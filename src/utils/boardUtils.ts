import cuid from 'cuid';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';

export const generateBoard = (boardSize: number, cardItems: CardItem[]) => {
  if (!boardSize) throw new Error('Missing size format');
  if (boardSize % 2 !== 0) throw new Error('Incorrect size amount');
  if (cardItems.length < boardSize / 2) throw new Error('insufficient number of card items');

  const selectedCardItems = cardItems.filter(({ selected }) => !!selected);
  // It's only half of items, since we need two same card to compare
  const chosenCardItems: CardItem[] = sampleSize(selectedCardItems, boardSize / 2);
  const board: Board = shuffle([...chosenCardItems, ...chosenCardItems])
    .map((cardItem: CardItem) => ({ id: cuid(), ...cardItem }));

  return board;
};

export const areAllCellsOpened = (boardSize: number, openedCells: number) => {
  return boardSize > 0 && boardSize === openedCells;
}

export const setGuessedCells = (board: Board, cellName: string) => {
  return board.map(cell => cell.name === cellName ? { ...cell, guessed: true } : cell);
}

export const setOpenedCells = (board: Board, cellId: string) => {
  return board.map(cell => cell.id === cellId && !cell.opened ? { ...cell, opened: true } : cell);
}

export const setClosedCells = (board: Board) => {
  return board.map(cell => cell.opened && !cell.guessed ? { ...cell, opened: false } : cell);
}

export const setOpenedLastCells = (board: Board) => {
  return board.map(cell => !cell.guessed && !cell.opened ? { ...cell, guessed: true, opened: true } : cell);
}

export const setRandomizeCells = (board: Board) => {
  const notGuessedCells: Board = [];
  const guessedCellsHash = board.reduce((guessed: { [key: string ]: BoardCell }, cell, index) => {
    cell.guessed ? guessed[index] = cell : notGuessedCells.push(cell);

    return guessed;
  }, {});

  const shuffledBoard = shuffle(notGuessedCells);

  for (let index in guessedCellsHash) {
    shuffledBoard.splice(parseInt(index), 0, guessedCellsHash[index]);
  }

  return shuffledBoard;
}
