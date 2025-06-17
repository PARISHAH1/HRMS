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
    const now = new Date();
    const result = await this.todosRepository.query(
      `INSERT INTO to_dos 
        (BucketID, AssignTo, AssgnBy, NotificationTo, DueDateTime, Priority, StatusType, FilePath, Title, Description, CID, created, updated, CreatedBy, UpdatedBy)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        todo.BucketID ?? null,
        todo.AssignTo ?? null,
        todo.AssgnBy ?? null,
        todo.NotificationTo ?? null,
        todo.DueDateTime ?? null,
        todo.Priority ?? null,
        todo.StatusType ?? null,
        todo.FilePath ?? null,
        todo.Title ?? null,
        todo.Description ?? null,
        todo.CID ?? null,
        now,
        now,
        todo.CreatedBy ?? null,
        todo.UpdatedBy ?? null,
      ]
    );
    
    const [inserted]: ToDos[] = await this.todosRepository.query('SELECT * FROM to_dos WHERE ToDoId = LAST_INSERT_ID()');
    return inserted;
  }

  async getAllToDos(): Promise<ToDos[]> {
    return this.todosRepository.query('SELECT * FROM to_dos');
  }

  async getToDoById(id: number): Promise<ToDos> {
    const [todo] = await this.todosRepository.query('SELECT * FROM to_dos WHERE ToDoId = ?', [id]);
    if (!todo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
    return todo;
  }

  async getToDosByAssignee(userId: number): Promise<ToDos[]> {
    return this.todosRepository.query('SELECT * FROM to_dos WHERE AssignTo = ?', [userId]);
  }

  async getToDosByAssigner(userId: number): Promise<ToDos[]> {
    return this.todosRepository.query('SELECT * FROM to_dos WHERE AssgnBy = ?', [userId]);
  }

  async updateToDo(id: number, todo: Partial<ToDos>): Promise<ToDos> {
    const now = new Date();
    await this.todosRepository.query(
      `UPDATE to_dos SET 
        BucketID = ?, AssignTo = ?, AssgnBy = ?, NotificationTo = ?, DueDateTime = ?, Priority = ?, StatusType = ?, FilePath = ?, Title = ?, Description = ?, CID = ?, updated = ?, UpdatedBy = ?
      WHERE ToDoId = ?`,
      [
        todo.BucketID ?? null,
        todo.AssignTo ?? null,
        todo.AssgnBy ?? null,
        todo.NotificationTo ?? null,
        todo.DueDateTime ?? null,
        todo.Priority ?? null,
        todo.StatusType ?? null,
        todo.FilePath ?? null,
        todo.Title ?? null,
        todo.Description ?? null,
        todo.CID ?? null,
        now,
        todo.UpdatedBy ?? null,
        id
      ]
    );
    return this.getToDoById(id);
  }

  async deleteToDo(id: number): Promise<void> {
    const result = await this.todosRepository.query('DELETE FROM to_dos WHERE ToDoId = ?', [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
  }
}
