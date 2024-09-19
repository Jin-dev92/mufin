import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseOptionFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
  const env = configService.get('NODE_ENV');
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    logging: true,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    retryDelay: Math.floor(Math.random() * 3 * 1000) + 3,
    retryAttempts: 3,
    entities: [join(__dirname, '..', 'entities', '**', '*.entity.{ts,js}')],
    // migrations: [
    //   join(__dirname, '..', 'migrations', '**', '*.migrations.{ts,js}'),
    // ],
    // migrationsRun: false,
    synchronize: env && env !== 'production',
  };
  console.log('database options: ', options);
  return options;
};
