import { shuffle } from 'lodash';

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
  stepsLimit: null
};

export const generateBoard = (size, items) => {
  if (!size || !items.length) {
    return { items };
  }

  if (size % 2 === 0) {
    if (items.length < size / 2) {
      return { error: 'Small number of pictures' };
    }

    const slicedArray = items.slice(0, size / 2);

    return {
      uniqueKeys: slicedArray.map(item => item.key),
      items: shuffle([...extendWithId(slicedArray), ...extendWithId(slicedArray)])
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
