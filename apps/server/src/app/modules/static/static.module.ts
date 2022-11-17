import { Module } from '@nestjs/common';
import { StaticService } from './services/static.service';
import { StaticController } from './controllers/static.controller';

@Module({
  providers: [StaticService],
  controllers: [StaticController],
})
export class StaticModule {}
