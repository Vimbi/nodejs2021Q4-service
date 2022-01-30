import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks?: Task[];
}

export const toResponse = (user: User): Omit<User, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
