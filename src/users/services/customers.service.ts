import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './../entity/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './../DTO/customers.dtos';

@Injectable()
export class CustomersService {

    private counterId = 1;

    private customers: Customer[] = [
        {
            id: 1,
            name: 'Cliente 1',
            lastname: 'decripcion del cliente 1',
            phone: '+56932196235',
        },
    ];

    findAll(){
        return this.customers;
    }

    findOne(id: number){
        const customer = this.customers.find((item) => item.id === id);
        if(!customer){
            throw new NotFoundException(`El Cliente #${id} no existe`);
        }
        return customer;
    }

    create(payload: CreateCustomerDto){
        this.counterId = this.counterId + 1;
        const newCustomer = {
            id: this.counterId,
            ...payload,
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    update(id: number, payload: UpdateCustomerDto) {
        const customer = this.findOne(id);
        if(customer){
            //buscamos la posicion del elemento en el array en memoria
            const index = this.customers.findIndex((item) => item.id === id);
            
            //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
            this.customers[index] = {
                ...customer,
                ...payload,
            };
            //ahora simplemente retornamos la posicion ya actualizada
            return this.customers[index];
        }else{
            return null;
        }
    }

    remove(id: number) {
        const index = this.customers.findIndex((item) => item.id === id);
        if (index === -1) {
          throw new NotFoundException(`El Cliente #${id} no existe`);
        } 
        this.customers.splice(index, 1);
        return true;
    }
}
