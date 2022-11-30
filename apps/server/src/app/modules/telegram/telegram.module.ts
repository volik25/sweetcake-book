import { Global, Module } from '@nestjs/common';
import { CakeModule } from '../cake/cake.module';
import { TelegramService } from './telegram.service';

@Global()
@Module({
  imports: [CakeModule],
  exports: [TelegramService],
  providers: [TelegramService],
})
export class TelegramModule {}
