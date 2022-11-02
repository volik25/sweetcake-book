import { Module } from '@nestjs/common';
import { CakeController } from './controllers/cake.controller';
import { CakeService } from './services/cake.service';

@Module({
  providers: [CakeService],
  controllers: [CakeController],
})
export class CakeModule {}
