import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Company' })
export class Company {
  @PrimaryGeneratedColumn({ name: 'CID' })
  cid: number;

  @Column({ name: 'CompanyName', length: 100 })
  companyName: string;

  @Column({ name: 'Location', length: 100 })
  location: string;

  @Column({ name: 'Strength', length: 50 })
  strength: string;

  @Column({ name: 'CreatedByUser' })
  createdByUser: number;

  @CreateDateColumn({ name: 'created' })
  created: Date;

  @UpdateDateColumn({ name: 'updated' })
  updated: Date;

  @Column({ name: 'CreatedBy' })
  createdBy: number;

  @Column({ name: 'UpdatedBy', nullable: true })
  updatedBy: number;
} 