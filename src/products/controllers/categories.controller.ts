import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { response } from 'express';

@Controller('categories')
export class CategoriesController {
    
    @Get()
    getCategories(
    ) {
       return {
         message: `Retornamos todas las categorias`,
       }; 
    }

    @Get(':categoryId')
    @HttpCode(HttpStatus.ACCEPTED)
    getCategory(@Param('categoryId') categoryId: string) {
        return `category ${categoryId}`;
    }

    @Post()
    create(@Body() payload: any){
      return {
        message: 'accion para crear',
        payload,
      };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: any){
      return {
        id,
        payload
      };
    }

    @Delete(':id')
    delete(@Param('id') id: number){
      return{
        id
      };
    }
}
