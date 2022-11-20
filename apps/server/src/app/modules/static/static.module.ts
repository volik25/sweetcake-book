import { Module } from '@nestjs/common';
import { StaticService } from './services/static.service';
import { StaticController } from './controllers/static.controller';
import { FilesModule } from '../files/files.module';
import { FilesService } from '../files/files.service';

@Module({
  imports: [FilesModule],
  providers: [StaticService, FilesService],
  controllers: [StaticController],
})
export class StaticModule {}
