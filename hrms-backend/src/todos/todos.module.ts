import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDos } from './todos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDos])],
  controllers: [],
  providers: [],
})
export class ToDosModule {}
