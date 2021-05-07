import { DEFAULT_BOARD_SIZE } from '../constants/constants';
import { IMAGES_LIST } from '../lists/imagesList';

export const GAME_CONFIG: GameConfig = {
  boardSize: DEFAULT_BOARD_SIZE.cells,
  boardRows: DEFAULT_BOARD_SIZE.rows,
  cardItems: IMAGES_LIST,
  stepsLimit: 0,
  randomizeCells: false
};
