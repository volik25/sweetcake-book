import { Injectable } from '@nestjs/common';
import { environment } from 'apps/server/src/environments/environment';
import { Subject } from 'rxjs';
import { Telegraf } from 'telegraf';
import { FmtString } from 'telegraf/typings/format';
import { CakeService } from '../cake/services/cake.service';

@Injectable()
export class TelegramService {
  public bot: Telegraf;
  public sendMessage$: Subject<{ socketId: string; message: string }> =
    new Subject();
  private isLaunched = false;

  constructor(private cakesService: CakeService) {
    this.bot = new Telegraf('5631309058:AAEUOI7UI5Ir5keYZHLbLBdVE4IvqzU0wJY');
    this.bot.command('cakes', async (ctx) => {
      const cakes = await this.cakesService.find();
      ctx.reply(JSON.stringify(cakes));
    });
    this.bot.command('done', async (ctx) => {
      if (ctx.message.chat.id.toString() !== '-1001820181405') {
        return;
      }
      const cakeId = (ctx.update.message.reply_to_message['text'] as string)
        .match(/Id тортика: \d+/)[0]
        ?.replace('Id тортика: ', '');

      ctx.reply(`Ура тортик (Id: ${cakeId}) готов!`);
    });
    this.bot.on('message', (ctx) => {
      if (ctx.message.chat.id.toString() !== '-1001820181405') {
        return;
      }
      const replyMessage = (ctx.update.message as any).reply_to_message;
      if (!replyMessage) {
        return;
      }

      const socketId = (replyMessage['text'] as string)
        .match(/Id клиента: .+\n/)[0]
        ?.replace('Id клиента: ', '')
        ?.replace('\n', '');

      if (!socketId) {
        return;
      }

      this.sendMessage$.next({ socketId, message: ctx.update.message['text'] });
    });
    if (environment.production) {
      return;
    }
    this.bot.launch();
    this.isLaunched = true;
  }

  public async start(): Promise<void> {
    if (this.isLaunched) {
      return;
    }
    this.bot.launch();
    this.isLaunched = false;
  }

  public async stop(): Promise<void> {
    if (!this.isLaunched) {
      return;
    }
    await this.bot.stop();
    this.isLaunched = false;
  }

  public async sendMessage(
    message: string | FmtString,
    chatId = '-1001820181405'
  ) {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.log(error);
    }
  }
}
