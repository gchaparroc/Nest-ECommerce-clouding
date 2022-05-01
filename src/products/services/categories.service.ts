import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entity/category.entity';
import { CreateCategoryDto } from './../dtos/categories.dtos';

@Injectable()
export class CategoriesService {

    private counterId = 1;

    private categories: Category[] = [
        {
            id: 1,
            name: 'Category 1',
            description: 'decripcion de la categoria 1',
            codigo: 1000,
        },
    ];

    findAll(){
        return this.categories;
    }

    findOne(id: number){
        const category = this.categories.find((item) => item.id === id);
        if(!category){
            throw new NotFoundException(`La categoria #${id} no existe`);
        }
        return category;
    }

    create(payload: CreateCategoryDto){
        this.counterId = this.counterId + 1;
        const newCategory = {
            id: this.counterId,
            ...payload,
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id: number, payload: any) {
        const category = this.findOne(id);
        if(category){
            //buscamos la posicion del elemento en el array en memoria
            const index = this.categories.findIndex((item) => item.id === id);
            
            //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
            this.categories[index] = {
                ...category,
                ...payload,
            };
            //ahora simplemente retornamos la posicion ya actualizada
            return this.categories[index];
        }else{
            return null;
        }
    }

    remove(id: number) {
        const index = this.categories.findIndex((item) => item.id === id);
        if (index === -1) {
          throw new NotFoundException(`La categoria #${id} no existe`);
        } 
        this.categories.splice(index, 1);
        return true;
    }
}
