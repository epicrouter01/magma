import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_DB_NAME, MONGO_URL } from "src/app.config";
import { User } from "./db/user";

@Injectable()
export class MongoConnection implements OnModuleInit, OnModuleDestroy {
    private client: MongoClient;
    
    async onModuleInit() {
        try {
            this.client = new MongoClient(MONGO_URL);
            await this.client.connect();
            console.log('Connected to mongoDB!');
        }
        catch(e) {
            console.log('Error connecting to DB!', e);
            throw e;
        }
    }
    
    async onModuleDestroy() {
        await this.client.close();
        console.log('Disconnected from mongoDB!');
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

    public async getAllUsers(): Promise<User[]> {
        const result = await this.users().find().toArray();
        return result.map(this.serialize)
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