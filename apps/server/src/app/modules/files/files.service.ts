import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { nanoid } from 'nanoid';

@Injectable()
export class FilesService {
  async upload(file: Express.Multer.File): Promise<string> {
    const uploadFolder = `${path}/uploads`;
    const splitted = file.originalname.split('.');
    const ext = splitted[splitted.length - 1];
    const fileName = `${nanoid()}.${ext}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${fileName}`, file.buffer);
    return `/static/${fileName}`;
  }

  async remove(filePath: string): Promise<unknown> {
    if (!filePath) {
      return;
    }
    return remove(
      `${path}/uploads/${filePath.replace('/static/', '')}`,
      (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      }
    );
  }
}
