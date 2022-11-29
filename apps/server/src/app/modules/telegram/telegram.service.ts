import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('5631309058:AAEUOI7UI5Ir5keYZHLbLBdVE4IvqzU0wJY');
  }

  public async sendMessage(message: string, chatId = '-1001801516827') {
    try {
      const res = await this.bot.telegram.sendMessage(chatId, message);
      console.log(res);
    } catch (error) {
      console.log(chatId, error);
    }
  }
}
