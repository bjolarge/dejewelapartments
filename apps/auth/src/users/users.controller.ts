import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){

    }
    @Post()
    async createUser(@Body() createUserDto:CreateUserDto){
        console.log('unreacheable');
        return this.userService.create(createUserDto);
    }
}
