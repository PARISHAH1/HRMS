import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDos } from './todos.entity';
import { ToDosController } from './todos.controller';
import { ToDosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDos])],
  controllers: [ToDosController],
  providers: [ToDosService],
  exports: [ToDosService],
})
export class ToDosModule {}
