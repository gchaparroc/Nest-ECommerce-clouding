import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly lastname: string;
    
    @IsString()
    @IsNotEmpty()
    readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}