import { IBoard } from '../../common/types/board';
import boards from '../../common/data/boards';
import Board from './board.model';

const getAll = async () => boards;

const addBoard = async (data: IBoard) => {
  const board = new Board(data);
  boards.push(board);
  return board;
};

const getBoardId = async (id: string) => {
  const result = boards.find((board) => board.id === id);
  return result;
};

const updateBoard = async (id: string, data: IBoard) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex !== -1) {
    const updatedBoard = { ...boards[boardIndex], ...data };
    boards[boardIndex] = updatedBoard;
    return updatedBoard;
  }
  return '';
};

const deleteBoard = async (id: string) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex !== -1) {
    boards.splice(boardIndex, 1);
    return true;
  }
  return false;
};

export { getAll, addBoard, getBoardId, updateBoard, deleteBoard };
