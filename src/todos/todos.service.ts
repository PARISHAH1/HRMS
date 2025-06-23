import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDos } from './todos.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDos)
    private todosRepository: Repository<ToDos>,
    private readonly companyService: CompanyService,
  ) {}

  async createToDo(
    createTodoDto: CreateTodoDto,
    userId: number,
    companyId?: number,
  ): Promise<ToDos> {
    const { DueDateTime, ...restDto } = createTodoDto;
    const todoData: Partial<ToDos> = {
      ...restDto,
      CreatedBy: userId,
      UpdatedBy: userId,
      AssgnBy: createTodoDto.AssgnBy || userId,
      StatusType: createTodoDto.StatusType || 'A',
      Priority: createTodoDto.Priority || 'M',
    };

    if (DueDateTime) {
      todoData.DueDateTime = new Date(DueDateTime);
    }

    if (companyId) {
      await this.companyService.findOne(companyId);
      todoData.CID = companyId;
    }

    const todo = this.todosRepository.create(todoData);
    return this.todosRepository.save(todo);
  }

  async getAllToDos(): Promise<ToDos[]> {
    return this.todosRepository.find({
      relations: [
        'bucket',
        'assignToUser',
        'assignedByUser',
        'company',
        'createdBy',
        'updatedBy',
      ],
    });
  }

  async getToDoById(id: number): Promise<ToDos> {
    const todo = await this.todosRepository.findOne({
      where: { ToDoId: id },
      relations: [
        'bucket',
        'assignToUser',
        'assignedByUser',
        'company',
        'createdBy',
        'updatedBy',
      ],
    });

    if (!todo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
    return todo;
  }

  async getToDosByAssignee(userId: number): Promise<ToDos[]> {
    return this.todosRepository.find({
      where: { AssignTo: userId },
      relations: [
        'bucket',
        'assignToUser',
        'assignedByUser',
        'company',
        'createdBy',
        'updatedBy',
      ],
    });
  }

  async getToDosByAssigner(userId: number): Promise<ToDos[]> {
    return this.todosRepository.find({
      where: { AssgnBy: userId },
      relations: [
        'bucket',
        'assignToUser',
        'assignedByUser',
        'company',
        'createdBy',
        'updatedBy',
      ],
    });
  }

  async updateToDo(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<ToDos> {
    const todo = await this.getToDoById(id);

    const { DueDateTime, AssignTo, BucketID, ...restDto } = updateTodoDto;
    const updatePayload: Partial<ToDos> = { ...restDto };

    if (DueDateTime) {
      updatePayload.DueDateTime = new Date(DueDateTime);
    }
    if (AssignTo !== undefined) {
      updatePayload.AssignTo = AssignTo;
    }
    if (BucketID !== undefined) {
      updatePayload.BucketID = BucketID;
    }

    Object.assign(todo, updatePayload);
    todo.UpdatedBy = userId;

    // Explicitly set and clear relations for Bucket and AssignTo
    if (BucketID !== undefined) {
      todo.BucketID = BucketID;
      todo.bucket = null as any;
    }
    if (AssignTo !== undefined) {
      todo.AssignTo = AssignTo;
      todo.assignToUser = null as any;
    }

    console.log('Received update payload:', updateTodoDto);
    console.log('Final entity before save:', todo);
    return this.todosRepository.save(todo);
  }

  async deleteToDo(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
  }

  async updateTodoStatus(
    id: number,
    status: string,
    userId: number,
  ): Promise<ToDos> {
    const todo = await this.getToDoById(id);
    todo.StatusType = status;
    todo.UpdatedBy = userId;
    return this.todosRepository.save(todo);
  }

  async getTodosByBucket(bucketId: number): Promise<ToDos[]> {
    return this.todosRepository.find({
      where: { BucketID: bucketId },
      relations: [
        'bucket',
        'assignToUser',
        'assignedByUser',
        'company',
        'createdBy',
        'updatedBy',
      ],
    });
  }
}
