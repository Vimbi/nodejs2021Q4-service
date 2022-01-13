import { getRepository } from 'typeorm';
import { Board } from './board.model';

/**
 * Returns an array of all boards
 * @returns an array of all boards
 */

const getAll = async (): Promise<Board[]> => {
  const boards = await getRepository(Board).find();
  return boards;
};

/**
 * Returns searched board or undefined
 * @param id the board id we are looking for
 * @returns searched board or undefined
 */

const getBoardId = async (id: string): Promise<Board | undefined> => {
  const result = await getRepository(Board).findOne(id);
  return result;
};

/**
 * Returns the added board
 * @param data new board parameters
 * @returns added board
 */

const addBoard = async (data: Board): Promise<Board | undefined> => {
  const board = await getRepository(Board).insert(data);
  return getRepository(Board).findOne(board.identifiers[0].id);
};

/**
 * Returns the updated board
 * @param id the id of the board we want to update
 * @param data parameters to update
 * @returns updated board or false
 */

const updateBoard = async (id: string, data: Board): Promise<false | Board> => {
  const board = await getRepository(Board).findOne(id);
  if (typeof board === 'undefined') {
    return false;
  }
  const updatedBoard = await getRepository(Board).update(id, data);
  return updatedBoard.raw;
};

/**
 * Deletes the board and deletes tasks attached to the board
 * @param id the id of the board we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteBoard = async (id: string): Promise<boolean> => {
  const board = getRepository(Board).findOne(id);
  if (typeof board === 'undefined') {
    return false;
  }
  await getRepository(Board).delete(id);
  return true;
};

export { getAll, addBoard, getBoardId, updateBoard, deleteBoard };
