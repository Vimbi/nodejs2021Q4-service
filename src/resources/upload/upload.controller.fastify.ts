import * as fs from 'fs';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { AuthGuard } from '../../guards/auth.guard';
// import { FastifyFileInterceptor } from '../../interceptors/fastify-file.interceptor';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { editFileName } from '../../utils/edit-file-name';
import { ParseFile } from '../../validation/upload/parse-file.pipe';
import { UploadDto } from './dto/upload.dto';

@Controller()
@UseGuards(AuthGuard)
export class UploadFastifyController {
  @Get('file/:filename')
  seeUploadedFile(@Param('filename') name, @Res() res): StreamableFile {
    console.log(`88888888`, `./files/${name}`)
    const isFileExists = fs.existsSync(`./files/${name}`);
    if (!isFileExists)
      throw new InternalServerErrorException(`File ${name} not found.`);
    const stream = fs.createReadStream(`./files/${name}`);
    return stream.pipe(res);
    // return new StreamableFile(stream);
    // return res.sendFile(name, { root: './files' });
  }

  @Post('file')
  @UseInterceptors(
    FileFastifyInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    })
  )
  single(
    @Body() body: UploadDto,
    @UploadedFile(ParseFile) file: Express.Multer.File
  ) {
    return { ...body, url: file };

    // const response = {
    //   originalname: file.originalname,
    //   filename: file.filename,
    // };
    // return response;
  }
}
