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
import { CustomersService } from './../services/customers.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from './../DTO/customers.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {

    constructor(private customersService: CustomersService){}

    @Get()
    getCustomers(
    ) {
        return this.customersService.findAll();
    }

    @Get(':customerId')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('customerId', ParseIntPipe) customerId: number) {
        return this.customersService.findOne(customerId);
    }

    @Post()
    create(@Body() payload: CreateCustomerDto){
        return this.customersService.create(payload);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDto){
        return this.customersService.update(id,payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
      return this.customersService.remove(id);
    }
}
