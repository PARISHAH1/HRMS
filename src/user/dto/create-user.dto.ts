import { IsString, IsDate, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @IsNotEmpty()
  @IsString()
  LastName: string;

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

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsString()
  @IsNotEmpty()
  Phone: string;

  @IsNumber()
  @IsNotEmpty()
  CID: number;

  @IsNotEmpty()
  @IsString()
  Password: string;
} 