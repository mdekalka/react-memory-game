import { shuffle, sampleSize } from 'lodash';

import { extendWithId} from '../utils/utils';
import { itemImages } from './GameAssets';

export const BOARD_AVAILABLE_SIZES = [10, 12, 14, 16];
const BOARD_DEFAULT_SIZE = BOARD_AVAILABLE_SIZES[0];

const generateGameItems = (items) => {
  return Object.keys(items).map(item => {
    return {
      key: item,
      image: items[item]
    }
  })
};

const gameItems = generateGameItems(itemImages);

export const gameOptions = {
  size: BOARD_DEFAULT_SIZE,
  items: gameItems,
  stepsLimit: null,
  hardcoreMode: false
};

export const generateBoard = (size, chosenKeys) => {
  if (!size) {
    return { error: 'Invalid number format'}
  }

  if (size % 2 === 0) {
    const halfSize = size / 2;
    let selectedItems;

    if (gameItems.length < halfSize) {
      return { error: 'Small number of pictures' };
    }

    if (chosenKeys.length && chosenKeys.length >= halfSize) {
      selectedItems = sampleSize(gameItems.filter(item => {
        if (chosenKeys.includes(item.key)) {
          return true;
        }

        return false;
      }), halfSize);
    } else {
      selectedItems = gameItems.slice(0, halfSize);
    }

    return {
      uniqueKeys: selectedItems.map(item => item.key),
      items: shuffle([...extendWithId(selectedItems), ...extendWithId(selectedItems)])
    };
  } else {
    return { error: 'Size of the board should even' };
  }
};

export const setStepsLimit = (size) => {
  const successLimit = size / 2;
  return successLimit + Math.floor(successLimit / 1.5);
};

export const defineSelectedItems = (activeKeys) => {
  if (!activeKeys.length) {
    return gameItems;
  };

  return gameItems.map(item => {
    if (activeKeys.includes(item.key)) {
      return {...item, selected: true };
    } else {
      return item;
    }
  })
}

export const validateImageCount = (keysLength, size) => {
  if (keysLength < size / 2) {
    const lackCount = (size / 2) - keysLength;

    return `You should add atleast ${lackCount} image(s) for this board size.`;
  }

  return null;
}
