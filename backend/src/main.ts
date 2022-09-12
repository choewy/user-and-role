import { NestFactory } from '@nestjs/core';
import { AppModule, AppService } from '@app';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const service = app.get(AppService);
  await service.registerApp(app);
  await service.useDefaultMiddlware();
  await service.useCors();
  await service.useSwagger();
  await service.listen();
};

bootstrap();
