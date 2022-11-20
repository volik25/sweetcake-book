import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { FilesService } from '../files/files.service';
import { LinksController } from './controllers/links.controller';
import { LinksService } from './services/links.service';

@Module({
  imports: [FilesModule],
  providers: [LinksService, FilesService],
  controllers: [LinksController],
})
export class LinksModule {}
