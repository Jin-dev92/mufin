import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* 글로벌 세팅 */
  // app.useGlobalInterceptors();
  // app.useGlobalFilters();
  await app.listen(+process.env.PORT || 4000);
}

bootstrap();
