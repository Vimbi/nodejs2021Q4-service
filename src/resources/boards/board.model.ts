import { v4 as uuid } from 'uuid';
import { IBoard } from '../../common/types/board';
import Column from './column.model';

class Board implements IBoard {
  id: string;

  title: string;

  columns: Column[];

  /**
   * Create a board
   * @param id - board's id
   * @param title - board's title
   * @param column - arrow of columns belonging to this board
   */

  constructor({
    id = uuid(),
    title = 'Board_Title',
    columns = [new Column()],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
