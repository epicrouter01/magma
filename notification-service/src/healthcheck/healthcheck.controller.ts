import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { KafkaHealthcheckService } from "./kafka.healthcheck.service";

@Controller('health')
export class HealthcheckController {
    constructor(private kafkaCheck: KafkaHealthcheckService) {
    }

    @Get()
    async healthcheck() {
        try {
            await this.kafkaCheck.check();
        }
        catch(e) {
            throw new HttpException('Not healthy!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return true;
    }
}