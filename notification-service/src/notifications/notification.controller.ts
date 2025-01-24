import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_CREATED_TOPIC, USER_DELETED_TOPIC } from 'src/app.config';

@Controller()
export class NotificationController {
  constructor() {}

  @MessagePattern(USER_CREATED_TOPIC)
  userCreated(@Payload() message: string) {
    console.log(`Welcome, user ${message}!`)
  }

  @MessagePattern(USER_DELETED_TOPIC)
  userDeleted(@Payload() message: string) {
    console.log(`User ${message} has been deleted!`)
  }
}
