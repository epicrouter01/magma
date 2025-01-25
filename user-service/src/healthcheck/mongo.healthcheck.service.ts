import { Injectable, Logger } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { MONGO_URL } from "src/app.config";

@Injectable()
export class MongoHealthcheckService {
    private readonly logger = new Logger(MongoHealthcheckService.name);

    constructor() {
    }

    async check() {
        let client: MongoClient;

        try {
            this.logger.log('Mongo healthcheck initiated');

            client = new MongoClient(MONGO_URL);
            await client.connect();

            this.logger.log('Mongo healthcheck connect complete!');
            await client.db().admin().ping()
            this.logger.log('Mongo healthcheck ping successful')
        }
        catch(e) {
            this.logger.error('Mongo healthcheck failed!', e);
            throw e;
        }
    }
}