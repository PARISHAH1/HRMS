import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'srv1536.hstgr.io',
  port: 3306,
  username: 'u428551797_Anantam',
  password: 'Anantam413',
  database: 'u428551797_HRMS',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  connectTimeout: 60000,
  logging: true,
}; 