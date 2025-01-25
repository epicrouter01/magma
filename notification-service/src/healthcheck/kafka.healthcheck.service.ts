import { Injectable } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { KAFKA_BROKER } from "src/app.config";

@Injectable()
export class KafkaHealthcheckService {
    constructor() {
    }

    async check() {
        try {
            console.log('Kafka healthcheck initiated!');

            let kafka = new Kafka({
                clientId: 'notification-service-health',
                brokers: [KAFKA_BROKER],
            });
            let producer = kafka.producer();

            await producer.connect();
            console.log('Kafka healthcheck: connection established!');
      
            await producer.send({
              topic: 'health.check',
              messages: [{ value: 'health check message' }],
            });
            
            console.log('Kafka healthcheck: message has been sent!');
            await producer.disconnect();
            console.log('Kafka healthcheck: kafka is healthy!');
          } catch (error) {
            console.log('Kafka is not healthy!', error);
            throw error;
          }
    }
}