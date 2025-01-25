import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './db/schema/user';
import { MongoConnection } from './db/mongo.connection';

@Injectable()
export class UserService {
    constructor(private db: MongoConnection) {
    }

    async createUser(name: string, email: string): Promise<User> {
      return this.db.createUser({
        name, email, createdAt: new Date(),
      });
    }
  
    async getAllUsers(from: number = 0, limit: number = 0): Promise<User[]> {
      return this.db.getAllUsers(from, limit);
    }

    async count(): Promise<number> {
      return this.db.count();
    }
  
    async getUserById(id: string): Promise<User> {
      const result = await this.db.findById(id);
      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      return result;
    }
  
    async updateUser(id: string, data: Partial<User>): Promise<User> {
      const result = await this.db.updateUser(id, data);

      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      return result;
    }
  
    deleteUser(id: string): Promise<boolean> {
      const result = this.db.deleteUser(id);

      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
  
      return result;
    }
}
