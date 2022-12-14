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
    try {
      await this.telegramService.sendMessage(this.getMessage(body));
    } catch (e) {
      console.log(e);
    }

    return true;
  }

  private getMessage(order: CreateOrderDto) {
    return fmt`
${bold`👉 Новый заказ!`}

${bold`🎂 Id тортика:`} ${order.cakeId}
${bold`💌 Email:`} ${order.email}
${bold`💌 ФИО:`} ${order.userName}
${bold`💌 Дата доставки:`} ${new Date(order.deliveryDate).toLocaleDateString()}
    `;
  }
}
