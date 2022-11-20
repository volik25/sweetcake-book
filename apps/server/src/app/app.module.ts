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

@Module({
  imports: [
    CakeModule,
    CategoryModule,
    SecurityModule,
    QuestionsModule,
    StaticModule,
    LinksModule,
    FilesModule,
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production', dir: `${path}/apps/client-next` }),
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
