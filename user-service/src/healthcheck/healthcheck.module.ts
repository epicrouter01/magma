import { Module } from "@nestjs/common";
import { HealthcheckController } from "./healthcheck.controller";
import { MongoHealthcheckService } from "./mongo.healthcheck.service";

@Module({
    controllers: [HealthcheckController],
    providers: [MongoHealthcheckService]
})
export class HealthcheckModule {}