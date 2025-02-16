import { IsNotEmpty, IsString, IsEmail, Min, IsOptional, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Max(25)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Max(25)
  lastName?: string;

  @IsString()
  @IsOptional()
  @Max(25)
  nickName?: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(4)
  @Max(20)
  password: string;
}
