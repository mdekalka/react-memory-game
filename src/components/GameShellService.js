import { shuffle } from 'lodash';

import { extendWithId} from '../utils/utils';

import bulba from '../assets/1.png';
import ivy from '../assets/2.png';
import venus from '../assets/3.png';
import charmander from '../assets/4.png';
import charmeleon from '../assets/5.png';
import charizard from '../assets/6.png';
import squirtle from '../assets/7.png';
import wartoitle from '../assets/8.png';

const BOARD_ITEMS_SIZE = 4;

export const gameItems = [
  { key: 'bulba', image: bulba },
  { key: 'ivy', image: ivy },
  { key: 'venus', image: venus },
  { key: 'charmander', image: charmander },
  { key: 'charmeleon', image: charmeleon },
  { key: 'charizard', image: charizard },
  { key: 'squirtle', image: squirtle },
  { key: 'wartoitle', image: wartoitle },
];

export const gameOptions = {
  size: BOARD_ITEMS_SIZE,
  items: gameItems,
  stepsLimit: null
};

export const generateBoard = (size = 4, items = []) => {
  if (!size || !items.length) {
    return { items };
  }

  if (size % 2 === 0) {
    if (items.length < size / 2) {
      return { error: 'Small number of pictures' };
    }

    const slicedArray = items.slice(0, size / 2);

    return { items: shuffle([...extendWithId(slicedArray), ...extendWithId(slicedArray)]) };
  } else {
    return { error: 'Size of the board should even' };
  }
};

export const setStepsLimit = (size) => {
  const successLimit = size / 2;
  return successLimit + Math.floor(successLimit / 1.5);
}
