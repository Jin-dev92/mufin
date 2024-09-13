import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/database';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { MusicsModule } from './musics.module';
import { GenreModule } from './genre.module';
import { AppController } from '../controllers';
import { AppService } from '../services';

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
    UsersModule,
    MusicsModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
