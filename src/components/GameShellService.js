import { shuffle, extendWithId} from '../utils/utils';
import BoardModel from './BoardModel';

import bulba from '../assets/1.png';
import ivy from '../assets/2.png';
import venus from '../assets/3.png';
import charmander from '../assets/4.png';
import charmeleon from '../assets/5.png';
import charizard from '../assets/6.png';
import squirtle from '../assets/7.png';
import wartoitle from '../assets/8.png';

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

export const generateBoard = (size = 4, items = []) => {
  if (!items.length) {
    return [];
  }

  const hashArray = {
    ids: [],
    mapping: {}
  };

  const shaffledArray = shuffle([...extendWithId(items), ...extendWithId(items)]);

  return shaffledArray;

  // return new BoardModel(shaffledArray);
}
