import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { USER_CREATED_TOPIC, USER_DELETED_TOPIC } from 'src/app.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('BROKER') private client: ClientKafkaProxy
  ) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    console.log('Creating user with name', userDto.name);
    const user = await this.userService.createUser(userDto.name, userDto.email);
    await this.client.emit(USER_CREATED_TOPIC, user.id);
    console.log('User create message has been sent for', user.id, USER_CREATED_TOPIC);
    return user;
  }

  @Get()
  async getAllUsers(@Query('from') from: number = 0, @Query('limit') limit: number = 0) {
    console.log('Getting users!');
    this.validateNumber(from);
    this.validateNumber(limit);
    const users = await this.userService.getAllUsers(from, limit);
    const count = await this.userService.count();
    return {
      users: users,
      count: count,
    }
  }

  private validateNumber(value) {
    if (typeof value !== 'number') {
      throw new HttpException('Not a number', HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('Getting user by id !', id);
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto
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

