import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from './../entity/brand.entity';
import { CreateBrandDto } from './../dtos/brands.dtos';

@Injectable()
export class BrandsService {

    private counterId = 1;

    private brands: Brand[] = [
        {
            id: 1,
            name: 'Brand 1',
            image: 'imagen de la marca 1',
        },
    ];

    
    findAll(){
        return this.brands;
    }

    findOne(id: number){
        const brand = this.brands.find((item) => item.id === id);
        if(!brand){
            //throw 'marca no existe';
            throw new NotFoundException(`La marca #${id} no existe`);
        }
        return brand;
    }

    create(payload: CreateBrandDto){
        this.counterId = this.counterId + 1;
        const newBrand = {
            id: this.counterId,
            ...payload,
        };
        this.brands.push(newBrand);
        return newBrand;
    }

    update(id: number, payload: any) {
        //reutilizamos el metodo findOne para buscar el producto y guardarlo en la variable
        const brand = this.findOne(id);
        if(brand){
            //buscamos la posicion del elemento en el array en memoria
            const index = this.brands.findIndex((item) => item.id === id);
            
            //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
            this.brands[index] = {
                ...brand,
                ...payload,
            };
            //ahora simplemente retornamos la posicion ya actualizada
            return this.brands[index];
        }else{
            return null;
        }
    }

    remove(id: number) {
        const index = this.brands.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`La marca #${id} no existe`);
        } 
        this.brands.splice(index, 1);
        return true;
    }
}
