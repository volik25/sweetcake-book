import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService
  implements OnApplicationShutdown, OnModuleInit, OnModuleDestroy
{
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('5631309058:AAEUOI7UI5Ir5keYZHLbLBdVE4IvqzU0wJY');
    this.bot.start((ctx) => ctx.reply('Welcome'));
    this.bot.help((ctx) => {
      console.log(ctx);

      ctx.reply('Send me a sticker');
    });
    this.bot.on('sticker', (ctx) => ctx.reply('👍'));
    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    this.bot.launch();
  }

  public onModuleDestroy() {
    console.log(222);
  }

  public onModuleInit() {
    console.log(333);
  }

  public onApplicationShutdown() {
    console.log(111);

    // await this.bot.stop();
  }

  public async sendMessage(message: string, chatId = '-1001801516827') {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.log(error);
    }
  }
}
