import { IBoard } from '../types/board';

const boards: IBoard[] = [
  {
    id: '0',
    title: 'board_0',
    columns: [
      {
        id: '0',
        title: 'board_1__column_0',
        order: 0,
      },
      {
        id: '1',
        title: 'board_1__column_1',
        order: 1,
      },
    ],
  },
  {
    id: '1',
    title: 'board_1',
    columns: [
      {
        id: '0',
        title: 'board_1__column_0',
        order: 0,
      },
      {
        id: '1',
        title: 'board_1__column_1',
        order: 1,
      },
    ],
  },
];

export default boards;
