import { Module } from '@nestjs/common';
import { NotificationController } from './notifications/notification.controller';

@Module({
  controllers: [NotificationController],
})
export class AppModule {}
