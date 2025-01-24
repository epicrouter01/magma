import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { USER_CREATED_TOPIC, USER_DELETED_TOPIC } from 'src/app.config';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('BROKER') private client: ClientKafkaProxy
  ) {}

  @Post()
  async createUser(@Body('name') name: string, @Body('email') email: string) {
    console.log('Createing user with name', name);
    const user = await this.userService.createUser(name, email);
    await this.client.emit(USER_CREATED_TOPIC, user.id);
    console.log('User create message has been sent for', user.id, USER_CREATED_TOPIC);
    return user;
  }

  @Get()
  getAllUsers() {
    console.log('Getting users!');
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('Getting user by id !', id);
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: any
  ) {
    console.log('Updating user by id !', id);
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log('Deleting user by id !', id);
    await this.userService.deleteUser(id);
    await this.client.emit(USER_DELETED_TOPIC, id);
    return { message: `User with ID ${id} deleted successfully.` };
  }
}

