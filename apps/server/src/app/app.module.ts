import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CakeModule } from '@api/modules/cake/cake.module';
import { CategoryModule } from '@api/modules/category/category.module';
import { SecurityModule } from '@api/modules/security/security.module';
import { getDataSource } from '@api/core/data-source';
import { QuestionsModule } from './modules/questions/questions.module';
import { StaticModule } from './modules/static/static.module';
import { LinksModule } from './modules/links/links.module';
import { FilesModule } from './modules/files/files.module';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { path } from 'app-root-path';
import { AppController } from './app.controller';
import { environment } from '../environments/environment';
import { TelegramModule } from './modules/telegram/telegram.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    CakeModule,
    CategoryModule,
    SecurityModule,
    QuestionsModule,
    StaticModule,
    LinksModule,
    FilesModule,
    OrderModule,
    TelegramModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: `${path}${environment.pagesDir}`,
      }),
      { viewsDir: null }
    ),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppModule.getDatabaseConfig();
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {
  public static getDatabaseConfig(): unknown {
    return {
      ...getDataSource().options,
      autoLoadEntities: true,
    };
  }
}
