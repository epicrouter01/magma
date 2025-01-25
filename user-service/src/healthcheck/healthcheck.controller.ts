import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { MongoHealthcheckService } from "./mongo.healthcheck.service";

@Controller('health')
export class HealthcheckController {
    constructor(private mongoCheck: MongoHealthcheckService) {
    }

    @Get()
    async healthcheck() {
        try {
            await this.mongoCheck.check();
        }
        catch(e) {
            throw new HttpException('Not healthy!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return true;
    }
}