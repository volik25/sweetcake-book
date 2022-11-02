import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { QueryLogger } from '@sweetcake/interfaces/logger/query.logger';
import { CakeModule } from '@sweetcake/api/modules/cake/cake.module';
import { CategoryModule } from '@sweetcake/api/modules/category/category.module';

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
      name: 'default',
      type: 'mysql',
      autoLoadEntities: true,
      synchronize: true,
      entities: getMetadataArgsStorage()
        .tables.filter((table) => !!table.schema)
        .map((tbl) => tbl.target),
      logging: true,
      logger: new QueryLogger(),
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sweetcake',
    };
  }
}
