import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@libs/health';
import { DatabaseModule } from '@libs/database';
import { UsersModule } from './users.module';
import { MusicsModule } from './musics.module';
import { GenresModule } from './genres.module';
import { AppController } from '../controllers';
import { AppService } from '../services';
import { VideosModule } from './videos.module';
import { AuthModule } from './auth.module';
import { UploadModule } from './upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['development', 'production'].includes(process.env.NODE_ENV)
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
      isGlobal: true,
    }),
    HealthModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    MusicsModule,
    GenresModule,
    VideosModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
