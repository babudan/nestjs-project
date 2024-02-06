import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';


export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly username: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}