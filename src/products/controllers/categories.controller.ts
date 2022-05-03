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
import { CategoriesService } from './../services/categories.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateCategoryDto } from './../dtos/categories.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    
  constructor(private categoriesService: CategoriesService){}

    @Get()
    getCategories(
    ) {
      return this.categoriesService.findAll(); 
    }

    @Get(':categoryId')
    @HttpCode(HttpStatus.ACCEPTED)
    getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
      return this.categoriesService.findOne(categoryId);
    }

    @Post()
    create(@Body() payload: CreateCategoryDto){
      return this.categoriesService.create(payload);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any){
      return this.categoriesService.update(+id,payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
      return this.categoriesService.remove(id);
    }
}
