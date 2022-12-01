import { JwtGuard } from '@api/guards/jwt.guard';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Multer } from 'multer'; // нужен чтобы не было ошибки типа Express.Multer.File
import { Express } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from 'libs/interfaces/static/dtos/file-upload.dto';

@Controller('api/files')
@ApiTags('File')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.filesService.upload(file);
  }
}
