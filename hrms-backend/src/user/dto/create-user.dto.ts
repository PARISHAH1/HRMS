import { IsString, IsDate, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Fname: string;

  @IsString()
  @IsNotEmpty()
  Lname: string;

  @IsString()
  @IsNotEmpty()
  Mname: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  DOB: Date;

  @IsString()
  @IsNotEmpty()
  StatusType: string;

  @IsNumber()
  @IsNotEmpty()
  DepartmentID: number;

  @IsString()
  @IsNotEmpty()
  UserType: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  Phone: string;

  @IsNumber()
  @IsNotEmpty()
  CID: number;
} 