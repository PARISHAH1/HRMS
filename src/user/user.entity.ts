import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UID: number;

  @Column({ length: 50 })
  Fname: string;

  @Column({ length: 50 })
  Lname: string;

  @Column({ length: 50 })
  Mname: string;

  @Column({ type: 'datetime' })
  DOB: Date;

  @Column({ length: 1 })
  StatusType: string;

  @Column({ type: 'int', width: 11 })
  DepartmentID: number;

  @Column({ length: 11 })
  UserType: string;

  @Column({ length: 255 })
  Password: string;

  @Column({ length: 100 })
  Email: string;

  @Column({ length: 20 })
  Phone: string;

  @Column({ type: 'int', width: 10, unsigned: true })
  CID: number;

  @Column({ type: 'datetime' })
  created: Date;

  @Column({ type: 'datetime' })
  updated: Date;

  @Column({ type: 'int', width: 11 })
  CreatedBy: number;

  @Column({ type: 'int', width: 11 })
  UpdatedBy: number;
} 