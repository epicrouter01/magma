import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER } from './app.config';
import { MongoConnection } from './user/mongo.connection';

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
  providers: [MongoConnection, UserService],
})
export class AppModule {}
