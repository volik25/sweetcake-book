import { Module } from '@nestjs/common';
import { StaticService } from './services/static.service';
import { StaticController } from './controllers/static.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [StaticService],
  controllers: [StaticController],
})
export class StaticModule {}
