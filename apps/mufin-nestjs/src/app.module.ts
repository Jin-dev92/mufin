import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/database';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['development', 'production'].includes(process.env.NODE_ENV)
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
      isGlobal: true,
    }),
    HealthModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
