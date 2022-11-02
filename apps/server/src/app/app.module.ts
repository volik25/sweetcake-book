import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { QueryLogger } from '@sweetcake/interfaces/logger/query.logger';
import { CakeModule } from '@sweetcake/api/modules/cake/cake.module';
import { CategoryModule } from '@sweetcake/api/modules/category/category.module';
import { dataSource } from '@sweetcake/api/core/data-source';

@Module({
  imports: [
    CakeModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppModule.getDatabaseConfig();
      },
    }),
  ],
})
export class AppModule {
  public static getDatabaseConfig(): unknown {
    return {
      ...dataSource.options,
      autoLoadEntities: true,
    };
  }
}
