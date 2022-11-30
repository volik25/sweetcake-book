import { Injectable } from '@nestjs/common';
import { environment } from 'apps/server/src/environments/environment';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  public bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('5631309058:AAEUOI7UI5Ir5keYZHLbLBdVE4IvqzU0wJY');
    this.bot.start((ctx) => ctx.reply('Welcome'));
    this.bot.help((ctx) => {
      console.log(ctx);

      ctx.reply('Send me a sticker');
    });
    this.bot.on('sticker', (ctx) => ctx.reply('👍'));
    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    if (!environment.production) {
      this.bot.launch();
      return;
    }

    this.bot.launch({
      webhook: {
        domain: 'stand1.progoff.ru',
      },
    });
  }

  public async sendMessage(message: string, chatId = '-1001801516827') {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.log(error);
    }
  }
}
