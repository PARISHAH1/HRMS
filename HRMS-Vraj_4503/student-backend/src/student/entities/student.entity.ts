import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsEnum, IsInt, IsDateString, Length, Min, Max } from 'class-validator';

@Entity('students') 
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  @Length(0, 16, { message: 'Name must be between 0 and 16 characters' })
  name: string;

  @Column({ length: 100 })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Column()
  @IsInt()
  @Min(0, { message: 'Age must be greater than 0' })
  @Max(50, { message: 'Age must be less than 50' })
  age: number;

  @Column({ length: 10, name: 'phoneNumber' })
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phoneNumber: string;

  @Column({ type: 'date', name: 'DateOfBirth' })
  @IsDateString({}, { message: 'Date of birth must be in YYYY-MM-DD format' })
  DateOfBirth: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  @IsEnum(['male', 'female', 'other'], { message: 'Gender must be either male, female, or other' })
  gender: 'male' | 'female' | 'other';
}