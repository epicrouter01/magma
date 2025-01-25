import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_DB_NAME, MONGO_URL } from "src/app.config";
import { User } from "./schema/user";

@Injectable()
export class MongoConnection implements OnModuleInit, OnModuleDestroy {
    private client: MongoClient;
    private readonly logger = new Logger(MongoConnection.name);
    
    async onModuleInit() {
        try {
            this.client = new MongoClient(MONGO_URL);
            await this.client.connect();
            this.logger.log('Connected to mongoDB!');
        }
        catch(e) {
            this.logger.log('Error connecting to DB!', e);
            throw e;
        }
    }
    
    async onModuleDestroy() {
        await this.client.close();
        this.logger.log('Disconnected from mongoDB!');
    }

    public async createUser(user: Omit<User, 'id'>): Promise<User> {
        const result = await this.users().insertOne({...user});
        return {id: result.insertedId.toString(), ...user};
    }

    public async findById(id: string): Promise<User | null> {
        const result = await this.users().findOne(new ObjectId(id));

        if (!result) {
            return null;
        }

        return this.serialize(result);
    }

    public async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
        const result = await this.users().updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: updateData
            }
        );
        if (result.modifiedCount === 0) return null;

        return this.findById(id);
    }

    public async deleteUser(id: string): Promise<boolean> {
        const result = await this.users().deleteOne({_id: new ObjectId(id)});
        return result.deletedCount > 0;
    }

    public async getAllUsers(from: number = 0, limit: number = 0): Promise<User[]> {
        const result = await this.users().find().skip(from).limit(limit).toArray();
        return result.map(this.serialize);
    }

    public async count(): Promise<number> {
        return this.users().countDocuments();
    }

    private serialize(document): User {
        return {
            id: document._id.toString(),
            name: document.name,
            email: document.email,
            createdAt: document.createdAt
        };
    }

    private users() {
        return this.client.db(MONGO_DB_NAME).collection('users');
    }
}