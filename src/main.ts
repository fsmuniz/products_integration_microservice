import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Helper } from './helpers';
import { AppModule } from './modules/app/app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { rabbitMqConsumerConfig } from './constants/rabbit-mq.constant';

async function bootstrap() {
  const helperService = new Helper();
  const logger = new Logger('bootstrap');
  const { port } = helperService.getEnviroment();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, rabbitMqConsumerConfig);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen().then(() => {
    logger.log(`Authentication microservice running on port ${port}`);
  });
}

bootstrap();
