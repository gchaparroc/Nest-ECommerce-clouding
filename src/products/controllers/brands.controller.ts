import { Controller, Get, Param, Post, Query, Body, Put, Delete } from '@nestjs/common';
import { response } from 'express';

@Controller('brands')
export class BrandsController {
    
    @Get()
    getBrands(
    ) {
       return {
         message: `Retornamos todas las categorias`,
       };
    }

    @Get(':brandId')
    getBrand(@Param('brandId') brandId: string) {
        return `brand ${brandId}`;
    }

    
}
