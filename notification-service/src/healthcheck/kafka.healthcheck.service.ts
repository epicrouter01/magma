import { Injectable, Logger } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { KAFKA_BROKER } from "src/app.config";

@Injectable()
export class KafkaHealthcheckService {
  private readonly logger = new Logger(KafkaHealthcheckService.name);

  constructor() {
  }

  async check() {
    try {
        this.logger.log('Kafka healthcheck initiated!');

        let kafka = new Kafka({
            clientId: 'notification-service-health',
            brokers: [KAFKA_BROKER],
        });
        let producer = kafka.producer();

        await producer.connect();
        this.logger.log('Kafka healthcheck: connection established!');
  
        await producer.send({
          topic: 'health.check',
          messages: [{ value: 'health check message' }],
        });
        
        this.logger.log('Kafka healthcheck: message has been sent!');
        await producer.disconnect();
        this.logger.log('Kafka healthcheck: kafka is healthy!');
      } catch (error) {
        this.logger.error('Kafka is not healthy!', error);
        throw error;
      }
  }
}