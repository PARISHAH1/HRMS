import { Controller, Post, Get, Body } from '@nestjs/common';
import { ToDosService } from './todos.service';
import { ToDos } from './todos.entity';

@Controller('todos')
export class ToDosController {
  constructor(private readonly todosService: ToDosService) {}

  @Post()
  async createToDo(@Body() todo: Partial<ToDos>): Promise<ToDos> {
    return this.todosService.createToDo(todo);
  }

  @Get()
  async getAllToDos(): Promise<ToDos[]> {
    return this.todosService.getAllToDos();
  }
}
