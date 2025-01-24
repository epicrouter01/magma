import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER } from './app.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-service',
        brokers: [KAFKA_BROKER],
        retry: {
          initialRetryTime: 500,
          retries: 20
        }
      },
      consumer: {
        groupId: 'notification-service',
      }
    }
  });
  await app.listen();
}
bootstrap();
