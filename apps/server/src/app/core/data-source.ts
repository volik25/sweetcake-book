import { DataSource, getMetadataArgsStorage } from 'typeorm';
import { QueryLogger } from '@interfaces/logger/query.logger';

export const dataSource = new DataSource({
  name: 'default',
  type: 'mysql',
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
});
