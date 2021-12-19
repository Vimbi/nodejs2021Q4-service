import Column from '../../resources/boards/column.model';

export interface IBoard {
  id: string;
  title: string;
  columns: Column[];
}
