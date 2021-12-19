import { v4 as uuid } from 'uuid';
import { IColumn } from '../../common/types/column';

class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  /**
   * Create a column
   * @param id - column's id
   * @param title - column's title
   * @param order - column's order
   */

  constructor({ id = uuid(), title = 'Column_Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
