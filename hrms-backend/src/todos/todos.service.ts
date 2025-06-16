import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDos } from './todos.entity';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDos)
    private todosRepository: Repository<ToDos>,
  ) {}

  async createToDo(todo: Partial<ToDos>): Promise<ToDos> {
    const newToDo = this.todosRepository.create(todo);
    return this.todosRepository.save(newToDo);
  }

  async getAllToDos(): Promise<ToDos[]> {
    return this.todosRepository.find();
  }
}
