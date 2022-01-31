import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ParseFile } from '../../validation/upload/parse-file.pipe';
import { UploadDto } from './dto/upload.dto';

@Controller()
export class UploadController {
  @Get(':filename')
  seeUploadedFile(@Param('filename') name, @Res() res) {
    return res.sendFile(name, { root: './files' });
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: UploadDto,
    @UploadedFile(ParseFile) file: Express.Multer.File
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
