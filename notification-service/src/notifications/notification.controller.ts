import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_CREATED_TOPIC, USER_DELETED_TOPIC } from 'src/app.config';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor() {}

  @MessagePattern(USER_CREATED_TOPIC)
  userCreated(@Payload() message: string) {
    this.logger.log(`Welcome, user ${message}!`)
  }

  @MessagePattern(USER_DELETED_TOPIC)
  userDeleted(@Payload() message: string) {
    this.logger.log(`User ${message} has been deleted!`)
  }
}
