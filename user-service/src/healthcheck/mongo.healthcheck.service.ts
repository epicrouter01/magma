import { Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { MONGO_URL } from "src/app.config";

@Injectable()
export class MongoHealthcheckService {
    constructor() {
    }

    async check() {
        let client: MongoClient;

        try {
            console.log('Mongo healthcheck initiated');

            client = new MongoClient(MONGO_URL);
            await client.connect();

            console.log('Mongo healthcheck connect complete!');
            await client.db().admin().ping()
            console.log('Mongo healthcheck ping successful')
        }
        catch(e) {
            console.log('Mongo healthcheck failed!', e);
            throw e;
        }
    }
}