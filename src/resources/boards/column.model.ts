import { v4 as uuid } from 'uuid';
import { IColumn } from '../../common/types/column';

class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuid(), title = 'Column_Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
