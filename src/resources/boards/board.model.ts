import { v4 as uuid } from 'uuid';
import { IBoard } from '../../common/types/board';
import Column from './column.model';

class Board implements IBoard {
  id: string;

  title: string;

  columns: Column[];

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
