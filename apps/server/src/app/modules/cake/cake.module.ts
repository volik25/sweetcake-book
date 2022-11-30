import { Module } from '@nestjs/common';
import { CakeService } from '@api/modules/cake/services/cake.service';
import { CakeController } from '@api/modules/cake/controllers/cake.controller';
import { CakeComponentService } from '@api/modules/cake/services/cake-component.service';

@Module({
  exports: [CakeService],
  providers: [CakeService, CakeComponentService],
  controllers: [CakeController],
})
export class CakeModule {}
