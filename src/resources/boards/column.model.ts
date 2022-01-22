// import {
//   Column,
//   Entity,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { v4 as uuid } from 'uuid';
// import { IColumn } from '../../common/types/column';
// import { Task } from '../tasks/task.model';
// import { Board } from './board.model';

// @Entity()
// export class ColumnEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column()
//   title!: string;

//   @Column()
//   order!: number;

//   @ManyToOne(() => Board, (board) => board.columns)
//   board!: Board;

//   @OneToMany(() => Task, (task) => task.column)
//   tasks!: Task[];
// }

// class Column implements IColumn {
//   id: string;

//   title: string;

//   order: number;

//   /**
//    * Create a column
//    * @param id - column's id
//    * @param title - column's title
//    * @param order - column's order
//    */

//   constructor({ id = uuid(), title = 'Column_Title', order = 0 } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }
// }

// export default Column;
