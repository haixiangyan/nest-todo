import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const baseURL = 'http://localhost:4200/static';
    return {
      file: baseURL + file.originalname,
    };
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      files: files.map((f) => f.buffer.toString()),
    };
  }
}
