import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Global()
@Module({
  exports: [TelegramService],
  providers: [TelegramService],
})
export class TelegramModule implements OnApplicationShutdown {
  async onApplicationShutdown(): Promise<void> {
    console.log(111);
  }
}
