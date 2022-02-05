import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from '../login/login.module';
import { Task } from '../tasks/task.entity';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task]), LoginModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
