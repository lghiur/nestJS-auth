import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  database: 'customDb',
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  synchronize: true,
  logging: true,
} as DataSourceOptions);