import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CakeModule } from '@api/modules/cake/cake.module';
import { CategoryModule } from '@api/modules/category/category.module';
import { SecurityModule } from '@api/modules/security/security.module';
import { getDataSource } from '@api/core/data-source';

@Module({
  imports: [
    CakeModule,
    CategoryModule,
    SecurityModule,
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
      ...getDataSource().options,
      autoLoadEntities: true,
    };
  }
}
