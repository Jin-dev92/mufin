import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* 글로벌 세팅 */
  app.useGlobalInterceptors();
  await app.listen(3000);
}
bootstrap();
