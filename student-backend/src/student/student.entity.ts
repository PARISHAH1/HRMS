import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column()
  DateOfBirth: string;
} 