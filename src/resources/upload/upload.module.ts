import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FastifyMulterModule, diskStorage } from 'fastify-file-interceptor';
import { editFileName } from '../../utils/edit-file-name';
import { LoginModule } from '../login/login.module';
import { UploadController } from './upload.controller';
import { UploadFastifyController } from './upload.controller.fastify';

@Module({
  imports: [
    process.env.USE_FASTIFY === 'true'
      ? FastifyMulterModule.register({
          storage: diskStorage({
            destination: './files',
            filename: editFileName,
          }),
        })
      : MulterModule.register({
          dest: './files',
        }),
    LoginModule,
  ],
  controllers: [UploadFastifyController],
})
export class UploadModule {}
