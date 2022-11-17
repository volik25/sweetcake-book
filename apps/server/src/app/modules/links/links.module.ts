import { Module } from '@nestjs/common';
import { LinksController } from './controllers/links.controller';
import { LinksService } from './services/links.service';

@Module({
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
