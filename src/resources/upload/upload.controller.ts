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
import { editFileName } from '../../utils/edit-file-name';
import { ParseFile } from '../../validation/upload/parse-file.pipe';
import { UploadDto } from './dto/upload.dto';

@Controller()
@UseGuards(AuthGuard)
export class UploadController {
  @Get('file/:filename')
  seeUploadedFile(@Param('filename') name, @Res() res) {
    return res.sendFile(name, { root: './files' });
  }

  @Post('file')
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
}
