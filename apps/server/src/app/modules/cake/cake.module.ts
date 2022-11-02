import { Module } from '@nestjs/common';
import { CakeService } from '@api/modules/cake/services/cake.service';
import { CakeController } from '@api/modules/cake/controllers/cake.controller';

@Module({
  providers: [CakeService],
  controllers: [CakeController],
})
export class CakeModule {}
