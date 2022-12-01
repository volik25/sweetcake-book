import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { CreateOrderDto } from '@interfaces/order/dtos/create-order.dto';
import { bold, fmt } from 'telegraf/format';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/order')
@ApiTags('Order')
export class OrderController {
  constructor(private telegramService: TelegramService) {}
  @Post()
  async addOrder(@Body() body: CreateOrderDto): Promise<unknown> {
    await this.telegramService.sendMessage(this.getMessage(body));
    return true;
  }

  private getMessage(order: CreateOrderDto) {
    return fmt`
${bold`👉 Новый заказ!`}

${bold`🎂 Id тортика:`} ${order.cakeId}
${bold`💌 Email:`} ${order.email}
    `;
  }
}
