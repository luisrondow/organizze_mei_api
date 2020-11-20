import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'pgsql',
  port: 5432,
  username: 'organizze_mei',
  password: 'Passw0rd',
  database: 'organizze_mei',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
