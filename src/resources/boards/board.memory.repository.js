const boards = require('../../common/data/boards');
const Board = require('./board.model');

const getAll = async () => boards;

const getBoardById = async (id) => {
  const searchedBoard = boards.find((board) => board.id === id);
  return searchedBoard;
};

const addBoard = async (data) => {
  const board = new Board(data);
  boards.push(board);
  return board;
};

const updateBoard = async (boardId, data) => {
  const boardIndex = boards.findIndex((board) => board.id === boardId);
  if (boardIndex !== 1) {
    const updatedBoard = { ...boards[boardIndex], ...data };
    boards[boardIndex] = updatedBoard;
    return updatedBoard;
  }
  return '';
};

const deleteBoard = async (id) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex !== -1) {
    boards.splice(boardIndex, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, addBoard, getBoardById, updateBoard, deleteBoard };
