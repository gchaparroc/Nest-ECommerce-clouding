import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Query, 
  Body, 
  HttpStatus, 
  HttpCode, 
  //ParseIntPipe 
} from '@nestjs/common';
import { response } from 'express';
import { ProductsService } from './../services/products.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    
    constructor(private productsService: ProductsService){}

    //Endpoint para retornar todos los productos
    //Ejemplo de Endpoint:   http://localhost:3000/products
    @Get()
    @ApiOperation({summary: 'Lista de todos los productos'})
    getProducts(
    ) {
        return this.productsService.findAll();
    }

    //Endpoint para recibir un pcoducto por id
    //Con el payload ya podemos hacer pruebas en Postman enviando parametros desde el body
    //Ejemplo de Endpoint:  http://localhost:3000/products/154
    @Get(':productId')
    @ApiOperation({summary: 'Busqueda de producto por Id'})
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('productId', ParseIntPipe) productId: number) {
        return this.productsService.findOne(productId);
    }


    //Endpoint para recibir un id de producto y un id de na categoria por ejemplo
    //Ejemplo de Endpoint:   http://localhost:3000/products/categories/5456/products/54353
    @Get('categories/:id/products/:productId')
    getCategory(@Param('productId') productId: string, 
    @Param('id') id: string) {
        return  `product: ${productId} and categories: ${id}`;
    }

    //Endpoint para recibir productos paginados (cantidad 100, empezando desde el 50, y una marca especifica)
    //Ejemplo de este endpoint sin parametros por defecto:    localhost:3000/products/paginados?limit=100&offset=50&brand=pelikan
    //Ejemplo de este endpoint con parametros por defecto:    localhost:3000/products/paginados?brand=pelikan
    @Get('paginados')
    getProductsPaginados(
      @Query('limit') limit = 100,
      //@Query('limit') limit: number,
      @Query('offset') offset = 50,
      //@Query('offset') offset: number,
      @Query('brand') brand: string,
    ) {
       return {
         message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
       };      
    }
    /*PARAMETROS TIPO QUERY (PARA MANDAR UN CONJUNTO GRANDE DE PARAMETROS DENTRO DE UN ENDPOINT Y NO HACERLO LATOSAMENTE DE 1 A 1 - EJEMPLO UN FILTRO)
        EN ESTE EJEMPLO QUEREMOS CONSULTAR UN CONJUNTO DE PRODUCTOS PAGINADOS, 100 PRODUCTOS (LIMIT) EMPEZANDO EN EL PRODUCTO 50 (OFFSET) Y POR LA MARCA 
        PELIKAN (BRAND)
    */

    //Endpoint para crear n nuevo producto, y lo probamos con el Postman o insomnia
    //OJO: tambien se puede especificar que atributos enviar, pero eso se va a ver ma adelante
    //Ejemplo de este Endpoint es: localhost:3000/products
    @Post()
    @ApiOperation({summary: 'Crear nuevo producto'})
    create(@Body() payload: CreateProductDto){
      return this.productsService.create(payload);
    }

    //Endpoint para actualizar, es un hibrido entre Get porque recibe un id y Post porque recibe parametros por el body
    //Ejemplo de Endpoint: localhost:3000/products/14
    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDto){
      return this.productsService.update(+id, payload);
    }

    //Endpoint para eliminar un producto, es muy parecido a un Get que recibe un id
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
      return this.productsService.remove(id);
    }

}
