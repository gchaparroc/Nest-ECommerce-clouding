import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly codigo: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}