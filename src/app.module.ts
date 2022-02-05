import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Board } from './resources/boards/board.entity';
import { Task } from './resources/tasks/task.entity';
import { User } from './resources/users/user.entity';
import { UserModule } from './resources/users/user.module';
import { BoardModule } from './resources/boards/board.module';
import { TaskModule } from './resources/tasks/task.module';
import { LoginModule } from './resources/login/login.module';
import { UploadModule } from './resources/upload/upload.module';
import { WinstonModule } from 'nest-winston';
import { configuration } from './logger/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: false,
      entities: [User, Board, Task],
      migrationsRun: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: './src/migrations',
      },
      keepConnectionAlive: true,
    }),
    WinstonModule.forRoot(configuration),
    BoardModule,
    TaskModule,
    UserModule,
    LoginModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
