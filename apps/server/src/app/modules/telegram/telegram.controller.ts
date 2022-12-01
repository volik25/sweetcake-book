import { JwtGuard } from '@api/guards/jwt.guard';
import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';

@ApiTags('Telegram')
@Controller('api/telegram')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Put('start')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async start(): Promise<unknown> {
    return this.telegramService.start();
  }

  @Put('stop')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async stop(): Promise<unknown> {
    return await this.telegramService.stop();
  }
}
