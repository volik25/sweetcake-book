import { Global, Module } from '@nestjs/common';
import { CakeModule } from '../cake/cake.module';
import { CakeService } from '../cake/services/cake.service';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

@Global()
@Module({
  imports: [CakeModule],
  exports: [TelegramService],
  providers: [TelegramService, CakeService],
  controllers: [TelegramController],
})
export class TelegramModule {}
