import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getToDoById(id: number): Promise<ToDos> {
    const todo = await this.todosRepository.findOne({ where: { ToDoId: id } });
    if (!todo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
    return todo;
  }

  async updateToDo(id: number, todo: Partial<ToDos>): Promise<ToDos> {
    await this.todosRepository.update(id, todo);
    return this.getToDoById(id);
  }

  async deleteToDo(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
  }
}
