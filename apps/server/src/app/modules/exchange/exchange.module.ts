import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
import { ExchangeService } from './services/exchange.service';

@Module({
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
