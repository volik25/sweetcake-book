import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { CreateOrderDto } from '@interfaces/order/dtos/create-order.dto';

@Controller('api/order')
export class OrderController {
  constructor(private telegramService: TelegramService) {}
  @Post()
  async addOrder(@Body() body: CreateOrderDto): Promise<unknown> {
    await this.telegramService.sendMessage(JSON.stringify(body));
    return true;
  }
}
