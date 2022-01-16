/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.model';
// import { ColumnEntity } from './column.model';
// import Column from './column.model';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', { nullable: true })
  columns!: string;

  // @OneToMany(() => ColumnEntity, (column) => column.board)
  // columns!: ColumnEntity[];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
