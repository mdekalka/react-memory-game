import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';

import { extendWithId, isKeysFalsy } from '../../utils/utils';
import { itemImages } from '../../config/cardsAssets';

export const BOARD_SIZES = {
  small: [8, 10, 12],
  medium: [14, 16, 18],
  large: [20, 22 ,24]
}

const BOARD_DEFAULT_SIZE = BOARD_SIZES.small[0];

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
  randomizeCells: false
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
      const cardsKeys = sampleSize(chosenKeys, halfSize);

      selectedItems = gameItems.filter(item => {
        if (cardsKeys.includes(item.key)) {
          return true;
        }

        return false;
      });
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
  const limitRadio = 1.74;

  return successLimit + Math.floor(successLimit / limitRadio);
};

export const defineSelectedImages = (activeKeys) => {
  return gameItems.map(item => {
    if (activeKeys.includes(item.key)) {
      return {...item, selected: true };
    } else {
      return item;
    }
  })
}

export const isImageCountValid = (imageKeys, boardSize) => {
  return imageKeys.length >= boardSize / 2;
}

export const insertItemsByIndex = (array, keysCollection) => {
  for (let index in keysCollection) {
    array.splice(index, 0, keysCollection[index]);
  }

  return array;
}

export const partialShaffle = (array, keys) => {
  let bufferIndexes = {};

  const withoutKeys = array.filter((item, index) => {
    if (isKeysFalsy(item, keys)) {
      return true
    }

    bufferIndexes[index] = item
    return false;
  })

  return insertItemsByIndex(shuffle(withoutKeys), bufferIndexes);
}