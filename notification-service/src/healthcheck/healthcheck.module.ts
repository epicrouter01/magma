import { Module } from "@nestjs/common";
import { HealthcheckController } from "./healthcheck.controller";
import { KafkaHealthcheckService } from "./kafka.healthcheck.service";

@Module({
    controllers: [HealthcheckController],
    providers: [KafkaHealthcheckService]
})
export class HealthcheckModule {}