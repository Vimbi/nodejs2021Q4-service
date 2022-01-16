/* eslint-disable import/no-cycle */
import 'reflect-metadata';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../boards/board.model';
// import { ColumnEntity } from '../boards/column.model';
import { User } from '../users/user.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order?: number = 0;

  @Column()
  description!: string;

  @Column({ nullable: true })
  userId!: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column({ nullable: true })
  columnId!: string;

  // @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  // @JoinColumn({ name: 'columnId' })
  // column!: ColumnEntity;
}
