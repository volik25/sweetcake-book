import { Module } from '@nestjs/common';
import { ChatGetaway } from './chat.getaway';

@Module({
  exports: [ChatGetaway],
  providers: [ChatGetaway],
})
export class ChatModule {}
