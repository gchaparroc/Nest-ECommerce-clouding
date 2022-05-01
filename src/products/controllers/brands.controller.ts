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
  //ParseIntPipe,
 } from '@nestjs/common';
import { response } from 'express';
import { BrandsService } from './../services/brands.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateBrandDto } from './../dtos/brands.dtos';

@Controller('brands')
export class BrandsController {
    
  constructor(private brandsService: BrandsService){}

    @Get()
    getBrands(
    ) {
      return this.brandsService.findAll();
    }

    @Get(':brandId')
    @HttpCode(HttpStatus.ACCEPTED)
    getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
      return this.brandsService.findOne(brandId);
    }

    @Post()
    create(@Body() payload: CreateBrandDto){
      return this.brandsService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any){
      return this.brandsService.update(+id,payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
      return this.brandsService.remove(id);
    }
}
