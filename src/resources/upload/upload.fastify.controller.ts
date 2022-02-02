import { Controller, Logger, Post, Req, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as pump from 'pump';
const logger = new Logger('FileController');

@Controller('file')
export class FastifyUploadController {
  @Post()
  upload(@Req() req: any, @Res() reply: any): void {
    const mp = req.multipart(
      (field: any, file: any, filename: any, encoding: any, mimeType: any) => {
        console.log('save file from request ---- ', field, filename, mimeType);
        file.on('limit', () => logger.error('SIZE_LIMITED'));

        const filePath = path.resolve('./files' + filename);
        const writeStream = fs.createWriteStream(filePath);
        pump(file, writeStream);
        writeStream.on('finish', () => {
          reply.code(200).send();
        });
      },

      (error: any) => {
        if (error) {
          logger.error(error);
          reply.code(500).send();
        }
      },
    );
    mp.on('partsLimit', () => logger.error('MAXIMUM_NUMBER_OF_FORM_PARTS'));
    mp.on('filesLimit', () => logger.error('MAXIMUM_NUMBER_OF_FILES'));
    mp.on('fieldsLimit', () => logger.error('MAXIMUM_NUMBER_OF_FIELD'));
  }
}