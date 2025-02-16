import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public createUser(@Body() userDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, userDto);

    if (!user.nickName) {
      user.nickName = `${user.firstName.slice(0, 5)}${user.lastName.slice(0, 5)}`;
      user.nickName = user.nickName.toLowerCase().trim();
    }
    return this.userService.create(user);
  }

  @Get()
  public getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(parseInt(id));
  }

  @Post('create-many')
  public createManyUsers(@Body() users: User[]): Promise<User[]> {
    return this.userService.createMany(users);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(parseInt(id));
  }

  @Put(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User | null> {
    return this.userService.update(parseInt(id), user);
  }
}
