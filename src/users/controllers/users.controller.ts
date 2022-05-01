import { 
    Controller, 
    Get, 
    Param, 
    Post, 
    Query, 
    Body, 
    Put, 
    Delete, 
    HttpStatus, 
    HttpCode,
    //ParseIntPipe 
} from '@nestjs/common';
import { response } from 'express';
import { UsersService } from './../services/users.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from './../DTO/users.dtos';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    getUsers(
    ) {
        return this.usersService.findAll();
    }

    @Get(':userId')
    @HttpCode(HttpStatus.ACCEPTED)
    getUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.findOne(userId);
    }

    @Post()
    create(@Body() payload: CreateUserDto){
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto){
        return this.usersService.update(id,payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
      return this.usersService.remove(id);
    }

    @Get(':id/orders')
    @HttpCode(HttpStatus.ACCEPTED)
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getOrdersByUser(id);
    }
}
