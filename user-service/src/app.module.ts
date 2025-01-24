import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER } from './app.config';

@Module({
  imports: [
    ClientsModule.register(
      [
        {
          name: 'BROKER',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'user-service',
              brokers: [KAFKA_BROKER],
            }
          }
        }
      ]
    )
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
