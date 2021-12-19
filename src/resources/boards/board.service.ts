import { IBoard } from '../../common/types/board';
import * as boardsRepo from './board.memory.repository';
import { deleteBoardTasks } from '../tasks/task.service';

/**
 * Returns an array of all boards
 * @returns an array of all boards
 */

const getAll = () => boardsRepo.getAll();

/**
 * Returns searched board or undefined
 * @param id the board id we are looking for
 * @returns searched board or undefined
 */

const getBoard = (id: string) => boardsRepo.getBoardId(id);

/**
 * Returns the added board
 * @param data new board parameters
 * @returns added board
 */

const addBoard = (data: IBoard) => boardsRepo.addBoard(data);

/**
 * Returns the updated board
 * @param id the id of the board we want to update
 * @param data parameters to update
 * @returns updated board or empty string
 */

const updateBoard = (id: string, data: IBoard) =>
  boardsRepo.updateBoard(id, data);

/**
 * Deletes the board and deletes tasks attached to the board
 * @param id the id of the board we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteBoard = async (id: string) => {
  await deleteBoardTasks(id);
  return boardsRepo.deleteBoard(id);
};

export { getAll, addBoard, getBoard, updateBoard, deleteBoard };
