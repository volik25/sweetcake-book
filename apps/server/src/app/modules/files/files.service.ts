import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async upload(file: Express.Multer.File): Promise<string> {
    const uploadFolder = `${path}/uploads`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
    return `/static/${file.originalname}`;
  }
}
