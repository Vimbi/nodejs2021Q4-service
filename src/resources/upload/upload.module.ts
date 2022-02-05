import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { LoginModule } from '../login/login.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    LoginModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
