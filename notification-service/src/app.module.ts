import { Module } from '@nestjs/common';
import { NotificationController } from './notifications/notification.controller';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [HealthcheckModule],
  controllers: [NotificationController],
})
export class AppModule {}
