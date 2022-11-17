import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { nanoid } from 'nanoid';

@Injectable()
export class FilesService {
  async upload(file: Express.Multer.File): Promise<string> {
    const uploadFolder = `${path}/uploads`;
    const ext = file.originalname.split('.').at(-1);
    const fileName = `${nanoid()}.${ext}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${fileName}`, file.buffer);
    return `/static/${fileName}`;
  }
}
