import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseOptionFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    logging: true,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    retryDelay: Math.floor(Math.random() * 3 * 1000) + 3,
    retryAttempts: 3,
    entities: [join(__dirname, '..', 'entities', '**', '*.entity.{ts,js}')],
    migrations: [
      join(__dirname, '..', 'migrations', '**', '*.migrations.{ts,js}'),
    ],
    migrationsRun: false,
    synchronize: configService.get('NODE_ENV') !== 'production',
  };
  return options;
};
