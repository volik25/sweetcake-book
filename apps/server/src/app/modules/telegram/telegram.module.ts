import { Global, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Global()
@Module({
  exports: [TelegramService],
  providers: [TelegramService],
})
export class TelegramModule {}
