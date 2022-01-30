import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from '../login/login.module';
import { Task } from '../tasks/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), LoginModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
