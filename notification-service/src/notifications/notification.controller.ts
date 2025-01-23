import { Controller, Get } from '@nestjs/common';

@Controller()
export class NotificationController {
  constructor() {}

  @Get()
  getHello(): string {
    return '';
  }
}
