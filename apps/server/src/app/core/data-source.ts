import { DataSource, getMetadataArgsStorage } from 'typeorm';
import { QueryLogger } from '@interfaces/logger/query.logger';

let dataSource = null;

export const getDataSource = () => {
  if (dataSource) return dataSource;
  dataSource = new DataSource({
    name: 'nomokoiw_cakes',
    type: 'mysql',
    synchronize: true,
    entities: getMetadataArgsStorage()
      .tables // .filter((table) => !!table.schema)
      .map((tbl) => tbl.target),
    logging: true,
    logger: new QueryLogger(),
    host: 'nomokoiw.beget.tech',
    // port: 3306,
    username: 'nomokoiw_cakes',
    password: 'MX%Ma4ya',
    database: 'nomokoiw_cakes',
  });
  return dataSource;
};
