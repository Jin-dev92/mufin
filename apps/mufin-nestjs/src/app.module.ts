import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['development', 'production'].includes(process.env.NODE_ENV)
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
