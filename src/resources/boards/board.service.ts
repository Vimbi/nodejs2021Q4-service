import { IBoard } from '../../common/types/board';
import * as boardsRepo from './board.memory.repository';
import { deleteBoardTasks } from '../tasks/task.service';

const getAll = () => boardsRepo.getAll();

const addBoard = (data: IBoard) => boardsRepo.addBoard(data);

const getBoard = (id: string) => boardsRepo.getBoardId(id);

const updateBoard = (id: string, data: IBoard) =>
  boardsRepo.updateBoard(id, data);

const deleteBoard = async (id: string) => {
  await deleteBoardTasks(id);
  return boardsRepo.deleteBoard(id);
};

export { getAll, addBoard, getBoard, updateBoard, deleteBoard };
