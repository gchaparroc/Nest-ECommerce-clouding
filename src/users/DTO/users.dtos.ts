import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    
    @IsString()
    @IsNotEmpty()
    readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}