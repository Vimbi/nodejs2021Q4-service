import { IBoard } from '../../common/types/board';
import boards from '../../common/data/boards';
import Board from './board.model';

/**
 * Returns an array of all boards
 * @returns an array of all boards
 */

const getAll = async (): Promise<IBoard[]> => boards;

/**
 * Returns searched board or undefined
 * @param id the board id we are looking for
 * @returns searched board or undefined
 */

const getBoardId = async (id: string): Promise<IBoard | undefined> => {
  const result = boards.find((board) => board.id === id);
  return result;
};

/**
 * Returns the added board
 * @param data new board parameters
 * @returns added board
 */

const addBoard = async (data: IBoard): Promise<Board> => {
  const board = new Board(data);
  boards.push(board);
  return board;
};

/**
 * Returns the updated board
 * @param id the id of the board we want to update
 * @param data parameters to update
 * @returns updated board or false
 */

const updateBoard = async (
  id: string,
  data: IBoard
): Promise<false | IBoard> => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex !== -1) {
    const updatedBoard: IBoard = { ...boards[boardIndex], ...data };
    boards[boardIndex] = updatedBoard;
    return updatedBoard;
  }
  return false;
};

/**
 * Deletes the board and deletes tasks attached to the board
 * @param id the id of the board we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteBoard = async (id: string): Promise<boolean> => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex !== -1) {
    boards.splice(boardIndex, 1);
    return true;
  }
  return false;
};

export { getAll, addBoard, getBoardId, updateBoard, deleteBoard };
