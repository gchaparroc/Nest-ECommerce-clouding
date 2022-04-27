import { Injectable } from '@nestjs/common';
import { Product } from './../entity/product.entity';

@Injectable()
export class ProductsService {
    private counterId = 1;

    private products: Product[] = [
        {
            id: 1,
            name: 'Product 1',
            description: 'decripcion del producto 1',
            price: 1000,
            stock: 1,
            image: '',
        },
    ];

    /*Metodo para retornar todos los productos*/ 
    findAll(){
        return this.products;
    }
    
    /*Metodo para retornar un producto por id*/
    findOne(id: number){
        return this.products.find((item) => item.id === id);
    }
    
    /*Metodo para crear nuevos productos*/
    create(payload: any){
        this.counterId = this.counterId + 1;
        const newProduct = {
            id: this.counterId,
            ...payload,
        };
        this.products.push(newProduct);
        return newProduct;
    }
    
    /*Metodo para actualizar */
    update(id: number, payload: any) {
        //reutilizamos el metodo findOne para buscar el producto y guardarlo en la variable
        const product = this.findOne(id);
        if(product){
            //buscamos la posicion del elemento en el array en memoria
            const index = this.products.findIndex((item) => item.id === id);
                
            //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
            this.products[index] = {
                ...product,
                ...payload,
            };
            //ahora simplemente retornamos la posicion ya actualizada
            return this.products[index];
        }else{
            return null;
        }
    }
        
    /*Metodo para eliminar*/
    remove(id: number) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            return `El producto #${id} no existe`;
            //throw new NotFoundException(`El Producto #${id} no existe`);
        } 
        this.products.splice(index, 1);
        return true;
    }
}
