import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  BucketID?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  AssignTo?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  AssgnBy?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  NotificationTo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  DueDateTime?: string;

  @ApiProperty({ required: false, enum: ['H', 'M', 'L'] })
  @IsOptional()
  @IsEnum(['H', 'M', 'L'])
  Priority?: string;

  @ApiProperty({ required: false, enum: ['A', 'C', 'P'] })
  @IsOptional()
  @IsEnum(['A', 'C', 'P'])
  StatusType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  FilePath?: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  CID?: number;
} 