import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { AuthGuard } from '../../guards/auth.guard';
import { FastifyFileInterceptor } from '../../interceptors/fastify-file.interceptor';
import { editFileName } from '../../utils/edit-file-name';
import { ParseFile } from '../../validation/upload/parse-file.pipe';
import { UploadDto } from './dto/upload.dto';
import { routeExpress, routeFastify } from '../../common/config';
import { UploadService } from './upload.service';
@Controller()
// @UseGuards(AuthGuard)
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Get('file/:filename')
  getFile(@Param('filename') name: string, @Res() res) {
    return this.uploadService.getFile(name, res);
  }

  @Post(routeExpress)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    })
  )
  uploadFile(
    @Body() body: UploadDto,
    @UploadedFile(ParseFile) file: Express.Multer.File
  ) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post(routeFastify)
  @UseInterceptors(
    FastifyFileInterceptor('file', {
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
  }
}
