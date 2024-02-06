import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class ContactDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly phonenumber: string;

    @IsNotEmpty()
    readonly postaladress: string;
}