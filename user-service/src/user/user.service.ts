import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './dto/user';

@Injectable()
export class UserService {
    private users: User[] = [];

    createUser(name: string, email: string): User {
      const newUser: User = {
        id: Math.random().toString(),
        name,
        email,
        createdAt: new Date(),
      };
  
      this.users.push(newUser);
      return newUser;
    }
  
    getAllUsers(): User[] {
      return this.users.slice();
    }
  
    getUserById(id: string): User {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      return user;
    }
  
    updateUser(id: string, name?: string, email?: string): User {
      const user = this.getUserById(id);
  
      if (name) {
        user.name = name;
      }
  
      if (email) {
        user.email = email;
      }
  
      return user;
    }
  
    deleteUser(id: string): void {
      const userIndex = this.users.findIndex((user) => user.id === id);
  
      if (userIndex === -1) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
  
      this.users.splice(userIndex, 1);
    }
}
